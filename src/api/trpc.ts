import { initTRPC, TRPCError } from "@trpc/server"
import { ZodError } from "zod"
import { createClient } from "@supabase/supabase-js"
import type { Context as HonoContext } from "hono"

import type { User } from "@supabase/supabase-js"

export type Context = {
  userId?: string
  user?: User
  req?: { header: (name: string) => string | undefined }
} & Record<string, unknown>

// Setup Supabase admin client for auth verification
const supabaseUrl =
  (import.meta as { env?: Record<string, string> }).env?.VITE_SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  "https://dummy.supabase.co"
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  (import.meta as { env?: Record<string, string> }).env?.VITE_SUPABASE_ANON_KEY ||
  "dummy-key"

export const supabaseAdminAuth = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
  },
})

export const createContext = async (c: HonoContext): Promise<Context> => {
  const authHeader = c.req.header("authorization")
  if (!authHeader) return {}

  const token = authHeader.replace("Bearer ", "")
  if (!token) return {}

  const { data: { user }, error } = await supabaseAdminAuth.auth.getUser(token)
  
  if (error || !user) {
    return {}
  }

  return {
    userId: user.id,
    user,
  }
}

const t = initTRPC.context<Context>().create({
  errorFormatter(opts) {
    const { shape, error } = opts
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === "BAD_REQUEST" && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    }
  },
})

export const router = t.router
export const publicProcedure = t.procedure

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" })
  }
  return next({
    ctx: {
      ...ctx,
      userId: ctx.userId,
      user: ctx.user,
    },
  })
})

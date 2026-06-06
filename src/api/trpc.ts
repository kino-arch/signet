import { initTRPC } from "@trpc/server"
import { ZodError } from "zod"

export interface Context {
  // We can add auth information here later if needed
  userId?: string
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

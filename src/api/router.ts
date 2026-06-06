import { Hono } from "hono"
import { trpcServer } from "@hono/trpc-server"
import { router } from "./trpc"
import { skillsRouter } from "./routers/skills"
import { slateRouter } from "./routers/slate"
import { aiRouter } from "./routers/ai"
import { templateRouter } from "./routers/template"

export const appRouter = router({
  skills: skillsRouter,
  slate: slateRouter,
  template: templateRouter,
})

export type AppRouter = typeof appRouter

const app = new Hono()

app.route("/ai", aiRouter)

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
    createContext: (_opts, _c) => ({}),
  })
)

export default app

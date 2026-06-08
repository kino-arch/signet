import { Hono } from "hono"
import { trpcServer } from "@hono/trpc-server"
import { router, createContext } from "./trpc"
import { skillsRouter } from "./routers/skills"
import { slateRouter } from "./routers/slate"
import { aiRouter } from "./routers/ai"
import { templateRouter } from "./routers/template"
import { jobTrackerRouter } from "./routers/jobTracker"

export const appRouter = router({
  skills: skillsRouter,
  slate: slateRouter,
  template: templateRouter,
  jobTracker: jobTrackerRouter,
})

export type AppRouter = typeof appRouter

const app = new Hono()

app.route("/ai", aiRouter)

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
    createContext: (_opts, _c) => createContext(_c),
  })
)

export default app

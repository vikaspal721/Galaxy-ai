import { initTRPC } from "@trpc/server";
import { workflowRouter } from "./workflow";
import { executionRouter } from "./execution";
import { creditsRouter } from "./credits";

const t = initTRPC.context().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = router({
  workflow: workflowRouter,
  execution: executionRouter,
  credits: creditsRouter,
});

export type AppRouter = typeof appRouter;

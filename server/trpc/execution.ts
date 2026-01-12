import { z } from "zod";
import { router, publicProcedure } from "./router";
import { requireAuth } from "../auth/clerk";
import { prisma } from "../db/prisma";

export const executionRouter = router({
  list: publicProcedure
    .input(z.object({ workflowId: z.string().optional() }))
    .query(async ({ input }) => {
      const user = await requireAuth();
      const executions = await prisma.execution.findMany({
        where: {
          workflow: {
            userId: user.id,
            ...(input.workflowId && { id: input.workflowId }),
          },
        },
        orderBy: { startedAt: "desc" },
        take: 50,
      });
      return executions;
    }),

  get: publicProcedure.input(z.string()).query(async ({ input }) => {
    const user = await requireAuth();
    const execution = await prisma.execution.findFirst({
      where: {
        id: input,
        workflow: { userId: user.id },
      },
    });
    if (!execution) {
      throw new Error("Execution not found");
    }
    return execution;
  }),

  create: publicProcedure
    .input(z.object({ workflowId: z.string() }))
    .mutation(async ({ input }) => {
      const user = await requireAuth();
      const workflow = await prisma.workflow.findFirst({
        where: { id: input.workflowId, userId: user.id },
      });
      if (!workflow) {
        throw new Error("Workflow not found");
      }

      const execution = await prisma.execution.create({
        data: {
          workflowId: input.workflowId,
          status: "pending",
        },
      });

      // TODO: Trigger workflow execution
      return execution;
    }),
});

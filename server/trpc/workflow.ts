import { z } from "zod";
import { router, publicProcedure } from "./router";
import { requireAuth } from "../auth/clerk";
import { prisma } from "../db/prisma";
import { createWorkflowSchema, updateWorkflowSchema } from "@/lib/zod/workflowSchema";

export const workflowRouter = router({
  list: publicProcedure.query(async () => {
    const user = await requireAuth();
    const workflows = await prisma.workflow.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: "desc" },
    });
    return workflows;
  }),

  get: publicProcedure.input(z.string()).query(async ({ input }) => {
    const user = await requireAuth();
    const workflow = await prisma.workflow.findFirst({
      where: { id: input, userId: user.id },
    });
    if (!workflow) {
      throw new Error("Workflow not found");
    }
    return workflow;
  }),

  create: publicProcedure.input(createWorkflowSchema).mutation(async ({ input }) => {
    const user = await requireAuth();
    const workflow = await prisma.workflow.create({
      data: {
        name: input.name,
        description: input.description,
        nodes: input.nodes as unknown,
        edges: input.edges as unknown,
        userId: user.id,
      },
    });
    return workflow;
  }),

  update: publicProcedure
    .input(z.object({ id: z.string(), data: updateWorkflowSchema }))
    .mutation(async ({ input }) => {
      const user = await requireAuth();
      const workflow = await prisma.workflow.updateMany({
        where: { id: input.id, userId: user.id },
        data: {
          name: input.data.name,
          description: input.data.description,
          nodes: input.data.nodes as unknown,
          edges: input.data.edges as unknown,
        },
      });
      return workflow;
    }),

  delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    const user = await requireAuth();
    await prisma.workflow.deleteMany({
      where: { id: input, userId: user.id },
    });
    return { success: true };
  }),
});

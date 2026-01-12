import { z } from "zod";
import { router, publicProcedure } from "./router";
import { requireAuth } from "../auth/clerk";
import { prisma } from "../db/prisma";

export const creditsRouter = router({
  get: publicProcedure.query(async () => {
    const user = await requireAuth();
    const credit = await prisma.credit.findFirst({
      where: { userId: user.id },
    });
    return credit ?? { amount: 0 };
  }),

  add: publicProcedure
    .input(z.object({ amount: z.number().int().positive() }))
    .mutation(async ({ input }) => {
      const user = await requireAuth();
      const credit = await prisma.credit.upsert({
        where: { userId: user.id },
        update: { amount: { increment: input.amount } },
        create: { userId: user.id, amount: input.amount },
      });
      return credit;
    }),

  ledger: publicProcedure.query(async () => {
    const user = await requireAuth();
    const ledger = await prisma.ledger.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return ledger;
  }),
});

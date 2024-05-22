import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "server/api/trpc";

export const groupRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1), img: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.groups.create({
        data: {
          name: input.name,
          img: input.img,
          createdBy: ctx.session.user.email as string,
        },
      });
    }),

});

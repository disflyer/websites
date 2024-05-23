import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "server/api/trpc";

export const chunkRouter = createTRPCRouter({

  list: publicProcedure
    .input(z.object({ groupId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.chunks.findMany({
        where: {
          groupId: input.groupId,
        }
      });
    }),

  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.groups.findFirst({
        where: {
          id: input.id
        }
      });
    }),

  create: protectedProcedure
    .input(z.object({ content: z.string().min(1), description: z.string().min(1), groupId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.chunks.create({
        data: {
          content: input.content,
          description: input.description,
          groupId: input.groupId,
        },
      });
    }),

  update: protectedProcedure
    .input(z.object({ id: z.string(), content: z.string().min(1), description: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.chunks.update({
        where: {
          id: input.id
        },
        data: {
          content: input.content,
          description: input.description,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.chunks.delete({
        where: {
          id: input.id
        },
      });
    }),

});

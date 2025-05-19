import { game } from '@/server/db/schemas/game-schema';
import { and, eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const gameRouter = createTRPCRouter({
  getGameByMember: protectedProcedure
    .input(
      z.object({
        memberId: z.string(),
        organizationId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const gameData = await ctx.db.query.game.findFirst({
        where: and(
          eq(game.memberId, input.memberId),
          eq(game.organizationId, input.organizationId)
        ),
      });

      return gameData;
    }),

  createGame: protectedProcedure
    .input(
      z.object({
        memberId: z.string(),
        organizationId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const newGame = await ctx.db
        .insert(game)
        .values({
          id: nanoid(),
          memberId: input.memberId,
          organizationId: input.organizationId,
          isInitialized: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      return newGame[0];
    }),

  getGame: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const gameData = await ctx.db.query.game.findFirst({
        where: eq(game.id, input.id),
      });

      if (!gameData) {
        throw new Error('Game not found');
      }

      return gameData;
    }),
});

import { GameData, game } from '@/server/db/schemas/game-schema';
import { and, eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';

// Zod schema for game data validation
const playerSchema = z.object({
  money: z.number(),
  name: z.string(),
  birthMonth: z.number(),
  birthYear: z.number(),
  isInitialized: z.boolean(),
  energy: z.number(),
  maxEnergy: z.number(),
});

const jobSchema = z.object({
  title: z.string(),
  company: z.string(),
  salary: z.number(),
});

const historyEventSchema = z.object({
  id: z.string(),
  type: z.enum(['transaction', 'job', 'asset', 'good', 'life']),
  description: z.string(),
  amount: z.number().optional(),
  timestamp: z.number(),
});

const gameDataSchema = z.object({
  player: playerSchema,
  jobs: z.object({
    currentJob: jobSchema.nullable(),
    availableJobs: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        company: z.string(),
        salary: z.number(),
      })
    ),
  }),
  assets: z.object({
    owned: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        type: z.literal('property'),
        value: z.number(),
        purchasePrice: z.number(),
      })
    ),
  }),
  goods: z.object({
    owned: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        purchasePrice: z.number(),
        resellValue: z.number(),
        monthlyCost: z.number(),
      })
    ),
  }),
  history: z.object({
    events: z.array(historyEventSchema),
  }),
  time: z.object({
    month: z.number(),
    year: z.number(),
    monthName: z.string(),
  }),
  investments: z.object({
    stocks: z.array(
      z.object({
        id: z.string(),
        symbol: z.string(),
        name: z.string(),
        description: z.string(),
        currentPrice: z.number(),
        priceHistory: z.array(
          z.object({
            timestamp: z.number(),
            price: z.number(),
          })
        ),
      })
    ),
    portfolio: z.array(
      z.object({
        id: z.string(),
        stockId: z.string(),
        shares: z.number(),
        averageBuyPrice: z.number(),
      })
    ),
  }),
});

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

  saveGameData: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        gameData: gameDataSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, gameData } = input;

      const updatedGame = await ctx.db
        .update(game)
        .set({
          gameData: gameData as GameData,
          updatedAt: new Date(),
        })
        .where(eq(game.id, id))
        .returning();

      if (!updatedGame.length) {
        throw new Error('Game not found');
      }

      return updatedGame[0];
    }),

  getGamesByOrganization: protectedProcedure
    .input(
      z.object({
        organizationId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const games = await ctx.db.query.game.findMany({
        where: eq(game.organizationId, input.organizationId),
      });

      return games;
    }),
});

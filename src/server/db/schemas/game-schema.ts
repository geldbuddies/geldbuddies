import { jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { member, organization } from './auth-schema';

// Game data schema types
export type GameData = {
  player: {
    money: number;
    name: string;
    birthMonth: number;
    birthYear: number;
    isInitialized: boolean;
    energy: number;
    maxEnergy: number;
  };
  jobs: {
    currentJob: {
      title: string;
      company: string;
      salary: number;
    } | null;
    availableJobs: Array<{
      id: string;
      title: string;
      company: string;
      salary: number;
    }>;
  };
  assets: {
    owned: Array<{
      id: string;
      name: string;
      type: 'property';
      value: number;
      purchasePrice: number;
    }>;
  };
  goods: {
    owned: Array<{
      id: string;
      name: string;
      purchasePrice: number;
      resellValue: number;
      monthlyCost: number;
    }>;
  };
  history: {
    events: Array<{
      id: string;
      type: 'transaction' | 'job' | 'asset' | 'good' | 'life';
      description: string;
      amount?: number;
      timestamp: number;
    }>;
  };
  time: {
    month: number;
    year: number;
    monthName: string;
  };
  investments: {
    stocks: Array<{
      id: string;
      symbol: string;
      name: string;
      description: string;
      currentPrice: number;
      priceHistory: Array<{
        timestamp: number;
        price: number;
      }>;
    }>;
    portfolio: Array<{
      id: string;
      stockId: string;
      shares: number;
      averageBuyPrice: number;
    }>;
  };
};

export const game = pgTable('game', {
  id: text('id').primaryKey(),
  memberId: text('member_id')
    .notNull()
    .references(() => member.id, { onDelete: 'cascade' }),
  organizationId: text('organization_id')
    .notNull()
    .references(() => organization.id, { onDelete: 'cascade' }),
  gameData: jsonb('game_data').$type<GameData | null>(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

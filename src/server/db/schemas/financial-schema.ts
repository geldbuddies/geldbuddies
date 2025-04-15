import { pgTable, serial, text, varchar, integer, boolean, decimal, timestamp, date } from "drizzle-orm/pg-core";
import { players } from "./user-schema";

export const assets = pgTable("assets", {
  id: serial("id").primaryKey(),
  playerId: serial("player_id").references(() => players.id),
  name: varchar("name", { length: 255 }),
  value: decimal("value", { precision: 10, scale: 2 }),
  isInsured: boolean("is_insured")
});

export const insurance = pgTable("insurance", {
  id: serial("id").primaryKey(),
  playerId: serial("player_id").references(() => players.id),
  assetId: serial("asset_id").references(() => assets.id),
  monthlyPremium: decimal("monthly_premium", { precision: 10, scale: 2 }),
  coverage: varchar("coverage", { length: 255 })
});

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  playerId: serial("player_id").references(() => players.id),
  type: varchar("type", { length: 255 }),
  amount: decimal("amount", { precision: 10, scale: 2 }),
  date: timestamp("date").defaultNow(),
  description: text("description"),
  gameStatusTimestamp: timestamp("game_status_timestamp").defaultNow()
});

export const loans = pgTable("loans", {
  id: serial("id").primaryKey(),
  playerId: serial("player_id").references(() => players.id),
  amount: decimal("amount", { precision: 10, scale: 2 }),
  interestRate: decimal("interest_rate", { precision: 5, scale: 2 }),
  term: integer("term"),
  status: varchar("status", { length: 255 }),
  gameStatusTimestamp: timestamp("game_status_timestamp").defaultNow()
});

export const loanRestructuring = pgTable("loan_restructuring", {
  id: serial("id").primaryKey(),
  loanId: serial("loan_id").references(() => loans.id),
  newAmount: decimal("new_amount", { precision: 10, scale: 2 }),
  newInterestRate: decimal("new_interest_rate", { precision: 5, scale: 2 }),
  newTerm: integer("new_term"),
  isApproved: boolean("is_approved"),
  gameStatusTimestamp: timestamp("game_status_timestamp").defaultNow()
});

export const investments = pgTable("investments", {
  id: serial("id").primaryKey(),
  playerId: serial("player_id").references(() => players.id),
  type: varchar("type", { length: 255 }),
  amount: decimal("amount", { precision: 10, scale: 2 }),
  expectedReturn: decimal("expected_return", { precision: 10, scale: 2 }),
  gameStatusTimestamp: timestamp("game_status_timestamp").defaultNow()
});

export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  playerId: serial("player_id").references(() => players.id),
  name: varchar("name", { length: 255 }),
  monthlyCost: decimal("monthly_cost", { precision: 10, scale: 2 }),
  startDate: date("start_date"),
  endDate: date("end_date"),
  isActive: boolean("is_active")
});

export const unexpectedExpenses = pgTable("unexpected_expenses", {
  id: serial("id").primaryKey(),
  playerId: serial("player_id").references(() => players.id),
  type: varchar("type", { length: 255 }),
  amount: decimal("amount", { precision: 10, scale: 2 }),
  isInsured: boolean("is_insured"),
  gameStatusTimestamp: timestamp("game_status_timestamp").defaultNow()
});

export const inflation = pgTable("inflation", {
  id: serial("id").primaryKey(),
  year: integer("year"),
  percentage: decimal("percentage", { precision: 5, scale: 2 }),
  impact: text("impact")
}); 
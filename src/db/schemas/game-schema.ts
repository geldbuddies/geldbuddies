import { pgTable, serial, text, varchar, integer, boolean, decimal, timestamp, date } from "drizzle-orm/pg-core";
import { players } from "./user-schema";

export const gameStatus = pgTable("game_status", {
  id: serial("id").primaryKey(),
  playerId: serial("player_id").references(() => players.id),
  month: integer("month"),
  level: integer("level"),
  status: varchar("status", { length: 255 }),
  gameStatusTimestamp: timestamp("game_status_timestamp").defaultNow()
});

export const energy = pgTable("energy", {
  id: serial("id").primaryKey(),
  playerId: serial("player_id").references(() => players.id),
  energyLevel: integer("energy_level"),
  recoveryTime: integer("recovery_time"),
  gameStatusTimestamp: timestamp("game_status_timestamp").defaultNow()
});

export const health = pgTable("health", {
  id: serial("id").primaryKey(),
  playerId: serial("player_id").references(() => players.id),
  healthLevel: integer("health_level"),
  hasIllness: boolean("has_illness"),
  gameStatusTimestamp: timestamp("game_status_timestamp").defaultNow()
});

export const employment = pgTable("employment", {
  id: serial("id").primaryKey(),
  playerId: serial("player_id").references(() => players.id),
  salary: decimal("salary", { precision: 10, scale: 2 }),
  weeklyHours: integer("weekly_hours"),
  gameStatusTimestamp: timestamp("game_status_timestamp").defaultNow()
});

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }),
  salary: decimal("salary", { precision: 10, scale: 2 }),
  requiredEducation: varchar("required_education", { length: 255 })
});

export const jobApplications = pgTable("job_applications", {
  id: serial("id").primaryKey(),
  playerId: serial("player_id").references(() => players.id),
  jobId: serial("job_id").references(() => jobs.id),
  status: varchar("status", { length: 255 })
});

export const education = pgTable("education", {
  id: serial("id").primaryKey(),
  playerId: serial("player_id").references(() => players.id),
  name: varchar("name", { length: 255 }),
  level: varchar("level", { length: 255 }),
  cost: decimal("cost", { precision: 10, scale: 2 })
});

export const badges = pgTable("badges", {
  id: serial("id").primaryKey(),
  playerId: serial("player_id").references(() => players.id),
  badgeName: varchar("badge_name", { length: 255 }),
  date: date("date")
});

export const leaderboard = pgTable("leaderboard", {
  id: serial("id").primaryKey(),
  playerId: serial("player_id").references(() => players.id),
  totalValue: decimal("total_value", { precision: 10, scale: 2 }),
  gameStatusTimestamp: timestamp("game_status_timestamp").defaultNow()
}); 
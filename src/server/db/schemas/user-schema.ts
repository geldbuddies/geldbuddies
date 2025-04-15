import { pgTable, serial, text, varchar, boolean, decimal, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).unique(),
  password: varchar("password", { length: 255 }),
  role: varchar("role", { length: 50 }) // Player or Teacher
});

export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  userId: serial("user_id").references(() => users.id),
  balance: decimal("balance", { precision: 10, scale: 2 }),
  educationLevel: varchar("education_level", { length: 255 }),
  income: decimal("income", { precision: 10, scale: 2 }),
  isActive: boolean("is_active"),
  gameStatusTimestamp: timestamp("game_status_timestamp").defaultNow()
});

export const teachers = pgTable("teachers", {
  id: serial("id").primaryKey(),
  userId: serial("user_id").references(() => users.id),
  schoolName: varchar("school_name", { length: 255 }),
  subject: varchar("subject", { length: 255 })
}); 
import { pgTable, serial, varchar, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { players, teachers } from "./user-schema";

export const classroomSessions = pgTable("classroom_sessions", {
  id: serial("id").primaryKey(),
  teacherId: serial("teacher_id").references(() => teachers.id),
  name: varchar("name", { length: 255 }).notNull(),
  code: varchar("code", { length: 8 }).notNull().unique(),
  description: text("description"),
  isActive: boolean("is_active").default(true),
  maxPlayers: integer("max_players"),
  createdAt: timestamp("created_at").defaultNow(),
  expiresAt: timestamp("expires_at")
});

export const classroomParticipants = pgTable("classroom_participants", {
  id: serial("id").primaryKey(),
  sessionId: serial("session_id").references(() => classroomSessions.id, { onDelete: 'cascade' }),
  playerId: serial("player_id").references(() => players.id),
  displayName: varchar("display_name", { length: 100 }),
  status: varchar("status", { length: 50 }).default("active"), // active, away, offline
  joinedAt: timestamp("joined_at").defaultNow(),
  lastActiveAt: timestamp("last_active_at").defaultNow(),
  isActive: boolean("is_active").default(true)
}); 
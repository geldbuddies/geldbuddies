import { pgTable, serial, decimal, boolean, timestamp } from "drizzle-orm/pg-core";
import { teachers, players } from "./user-schema";

export const teacherPlayerView = pgTable("teacher_player_view", {
  id: serial("id").primaryKey(),
  teacherId: serial("teacher_id").references(() => teachers.id),
  playerId: serial("player_id").references(() => players.id),
  isActive: boolean("is_active"),
  currentBalance: decimal("current_balance", { precision: 10, scale: 2 }),
  gameStatusTimestamp: timestamp("game_status_timestamp").defaultNow()
}); 
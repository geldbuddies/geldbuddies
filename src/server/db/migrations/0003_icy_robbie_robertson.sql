ALTER TABLE "classroom_sessions" ADD COLUMN "status" varchar(50) DEFAULT 'idle';--> statement-breakpoint
ALTER TABLE "classroom_participants" DROP COLUMN "status";
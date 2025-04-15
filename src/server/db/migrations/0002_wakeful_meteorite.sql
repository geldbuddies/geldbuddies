CREATE TABLE "classroom_participants" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" serial NOT NULL,
	"player_id" serial NOT NULL,
	"display_name" varchar(100),
	"status" varchar(50) DEFAULT 'active',
	"joined_at" timestamp DEFAULT now(),
	"last_active_at" timestamp DEFAULT now(),
	"is_active" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "classroom_sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"teacher_id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"code" varchar(8) NOT NULL,
	"description" text,
	"is_active" boolean DEFAULT true,
	"max_players" integer,
	"created_at" timestamp DEFAULT now(),
	"expires_at" timestamp,
	CONSTRAINT "classroom_sessions_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "assets" (
	"id" serial PRIMARY KEY NOT NULL,
	"player_id" serial NOT NULL,
	"name" varchar(255),
	"value" numeric(10, 2),
	"is_insured" boolean
);
--> statement-breakpoint
CREATE TABLE "inflation" (
	"id" serial PRIMARY KEY NOT NULL,
	"year" integer,
	"percentage" numeric(5, 2),
	"impact" text
);
--> statement-breakpoint
CREATE TABLE "insurance" (
	"id" serial PRIMARY KEY NOT NULL,
	"player_id" serial NOT NULL,
	"asset_id" serial NOT NULL,
	"monthly_premium" numeric(10, 2),
	"coverage" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "investments" (
	"id" serial PRIMARY KEY NOT NULL,
	"player_id" serial NOT NULL,
	"type" varchar(255),
	"amount" numeric(10, 2),
	"expected_return" numeric(10, 2),
	"game_status_timestamp" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "loan_restructuring" (
	"id" serial PRIMARY KEY NOT NULL,
	"loan_id" serial NOT NULL,
	"new_amount" numeric(10, 2),
	"new_interest_rate" numeric(5, 2),
	"new_term" integer,
	"is_approved" boolean,
	"game_status_timestamp" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "loans" (
	"id" serial PRIMARY KEY NOT NULL,
	"player_id" serial NOT NULL,
	"amount" numeric(10, 2),
	"interest_rate" numeric(5, 2),
	"term" integer,
	"status" varchar(255),
	"game_status_timestamp" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"player_id" serial NOT NULL,
	"name" varchar(255),
	"monthly_cost" numeric(10, 2),
	"start_date" date,
	"end_date" date,
	"is_active" boolean
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"player_id" serial NOT NULL,
	"type" varchar(255),
	"amount" numeric(10, 2),
	"date" timestamp DEFAULT now(),
	"description" text,
	"game_status_timestamp" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "unexpected_expenses" (
	"id" serial PRIMARY KEY NOT NULL,
	"player_id" serial NOT NULL,
	"type" varchar(255),
	"amount" numeric(10, 2),
	"is_insured" boolean,
	"game_status_timestamp" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "badges" (
	"id" serial PRIMARY KEY NOT NULL,
	"player_id" serial NOT NULL,
	"badge_name" varchar(255),
	"date" date
);
--> statement-breakpoint
CREATE TABLE "education" (
	"id" serial PRIMARY KEY NOT NULL,
	"player_id" serial NOT NULL,
	"name" varchar(255),
	"level" varchar(255),
	"cost" numeric(10, 2)
);
--> statement-breakpoint
CREATE TABLE "employment" (
	"id" serial PRIMARY KEY NOT NULL,
	"player_id" serial NOT NULL,
	"salary" numeric(10, 2),
	"weekly_hours" integer,
	"game_status_timestamp" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "energy" (
	"id" serial PRIMARY KEY NOT NULL,
	"player_id" serial NOT NULL,
	"energy_level" integer,
	"recovery_time" integer,
	"game_status_timestamp" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "game_status" (
	"id" serial PRIMARY KEY NOT NULL,
	"player_id" serial NOT NULL,
	"month" integer,
	"level" integer,
	"status" varchar(255),
	"game_status_timestamp" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "health" (
	"id" serial PRIMARY KEY NOT NULL,
	"player_id" serial NOT NULL,
	"health_level" integer,
	"has_illness" boolean,
	"game_status_timestamp" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "job_applications" (
	"id" serial PRIMARY KEY NOT NULL,
	"player_id" serial NOT NULL,
	"job_id" serial NOT NULL,
	"status" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "jobs" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255),
	"salary" numeric(10, 2),
	"required_education" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "leaderboard" (
	"id" serial PRIMARY KEY NOT NULL,
	"player_id" serial NOT NULL,
	"total_value" numeric(10, 2),
	"game_status_timestamp" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "players" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"balance" numeric(10, 2),
	"education_level" varchar(255),
	"income" numeric(10, 2),
	"is_active" boolean,
	"game_status_timestamp" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "teachers" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"school_name" varchar(255),
	"subject" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255),
	"password" varchar(255),
	"role" varchar(50),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "teacher_player_view" (
	"id" serial PRIMARY KEY NOT NULL,
	"teacher_id" serial NOT NULL,
	"player_id" serial NOT NULL,
	"is_active" boolean,
	"current_balance" numeric(10, 2),
	"game_status_timestamp" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "category" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transaction" (
	"id" text PRIMARY KEY NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"description" text,
	"date" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"category_id" text,
	"created_by_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transaction_participant" (
	"transaction_id" text NOT NULL,
	"user_id" text NOT NULL,
	"share" numeric(10, 2) NOT NULL,
	"is_paid" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "transaction_participant_transaction_id_user_id_pk" PRIMARY KEY("transaction_id","user_id")
);
--> statement-breakpoint
ALTER TABLE "classroom_participants" ADD CONSTRAINT "classroom_participants_session_id_classroom_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."classroom_sessions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "classroom_participants" ADD CONSTRAINT "classroom_participants_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "classroom_sessions" ADD CONSTRAINT "classroom_sessions_teacher_id_teachers_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."teachers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assets" ADD CONSTRAINT "assets_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "insurance" ADD CONSTRAINT "insurance_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "insurance" ADD CONSTRAINT "insurance_asset_id_assets_id_fk" FOREIGN KEY ("asset_id") REFERENCES "public"."assets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "investments" ADD CONSTRAINT "investments_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "loan_restructuring" ADD CONSTRAINT "loan_restructuring_loan_id_loans_id_fk" FOREIGN KEY ("loan_id") REFERENCES "public"."loans"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "loans" ADD CONSTRAINT "loans_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "unexpected_expenses" ADD CONSTRAINT "unexpected_expenses_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "badges" ADD CONSTRAINT "badges_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "education" ADD CONSTRAINT "education_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employment" ADD CONSTRAINT "employment_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "energy" ADD CONSTRAINT "energy_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game_status" ADD CONSTRAINT "game_status_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "health" ADD CONSTRAINT "health_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_applications" ADD CONSTRAINT "job_applications_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_applications" ADD CONSTRAINT "job_applications_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leaderboard" ADD CONSTRAINT "leaderboard_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "players" ADD CONSTRAINT "players_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teacher_player_view" ADD CONSTRAINT "teacher_player_view_teacher_id_teachers_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."teachers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teacher_player_view" ADD CONSTRAINT "teacher_player_view_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_created_by_id_user_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transaction_participant" ADD CONSTRAINT "transaction_participant_transaction_id_transaction_id_fk" FOREIGN KEY ("transaction_id") REFERENCES "public"."transaction"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transaction_participant" ADD CONSTRAINT "transaction_participant_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
-- Create users, players, and teachers tables
CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255),
  "email" VARCHAR(255) UNIQUE,
  "password" VARCHAR(255),
  "role" VARCHAR(50)
);

CREATE TABLE "players" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER REFERENCES "users"("id"),
  "balance" DECIMAL(10,2),
  "education_level" VARCHAR(255),
  "income" DECIMAL(10,2),
  "is_active" BOOLEAN,
  "game_status_timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "teachers" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER REFERENCES "users"("id"),
  "school_name" VARCHAR(255),
  "subject" VARCHAR(255)
);

-- Create classroom tables
CREATE TABLE "classroom_sessions" (
  "id" SERIAL PRIMARY KEY,
  "teacher_id" INTEGER REFERENCES "teachers"("id"),
  "name" VARCHAR(255) NOT NULL,
  "code" VARCHAR(8) NOT NULL UNIQUE,
  "description" TEXT,
  "is_active" BOOLEAN DEFAULT TRUE,
  "max_players" INTEGER,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "expires_at" TIMESTAMP
);

CREATE TABLE "classroom_participants" (
  "id" SERIAL PRIMARY KEY,
  "session_id" INTEGER REFERENCES "classroom_sessions"("id") ON DELETE CASCADE,
  "player_id" INTEGER REFERENCES "players"("id"),
  "display_name" VARCHAR(100),
  "status" VARCHAR(50) DEFAULT 'active',
  "joined_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "last_active_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "is_active" BOOLEAN DEFAULT TRUE
);

-- Create game-related tables
CREATE TABLE "game_status" (
  "id" SERIAL PRIMARY KEY,
  "player_id" INTEGER REFERENCES "players"("id"),
  "month" INTEGER,
  "level" INTEGER,
  "status" VARCHAR(255),
  "game_status_timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "energy" (
  "id" SERIAL PRIMARY KEY,
  "player_id" INTEGER REFERENCES "players"("id"),
  "energy_level" INTEGER,
  "recovery_time" INTEGER,
  "game_status_timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "health" (
  "id" SERIAL PRIMARY KEY,
  "player_id" INTEGER REFERENCES "players"("id"),
  "health_level" INTEGER,
  "has_illness" BOOLEAN,
  "game_status_timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "employment" (
  "id" SERIAL PRIMARY KEY,
  "player_id" INTEGER REFERENCES "players"("id"),
  "salary" DECIMAL(10,2),
  "weekly_hours" INTEGER,
  "game_status_timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "jobs" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(255),
  "salary" DECIMAL(10,2),
  "required_education" VARCHAR(255)
);

CREATE TABLE "job_applications" (
  "id" SERIAL PRIMARY KEY,
  "player_id" INTEGER REFERENCES "players"("id"),
  "job_id" INTEGER REFERENCES "jobs"("id"),
  "status" VARCHAR(255)
);

CREATE TABLE "education" (
  "id" SERIAL PRIMARY KEY,
  "player_id" INTEGER REFERENCES "players"("id"),
  "name" VARCHAR(255),
  "level" VARCHAR(255),
  "cost" DECIMAL(10,2)
);

CREATE TABLE "badges" (
  "id" SERIAL PRIMARY KEY,
  "player_id" INTEGER REFERENCES "players"("id"),
  "badge_name" VARCHAR(255),
  "date" DATE
);

CREATE TABLE "leaderboard" (
  "id" SERIAL PRIMARY KEY,
  "player_id" INTEGER REFERENCES "players"("id"),
  "total_value" DECIMAL(10,2),
  "game_status_timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create financial tables
CREATE TABLE "assets" (
  "id" SERIAL PRIMARY KEY,
  "player_id" INTEGER REFERENCES "players"("id"),
  "name" VARCHAR(255),
  "value" DECIMAL(10,2),
  "is_insured" BOOLEAN
);

CREATE TABLE "insurance" (
  "id" SERIAL PRIMARY KEY,
  "player_id" INTEGER REFERENCES "players"("id"),
  "asset_id" INTEGER REFERENCES "assets"("id"),
  "monthly_premium" DECIMAL(10,2),
  "coverage" VARCHAR(255)
);

CREATE TABLE "transactions" (
  "id" SERIAL PRIMARY KEY,
  "player_id" INTEGER REFERENCES "players"("id"),
  "type" VARCHAR(255),
  "amount" DECIMAL(10,2),
  "date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "description" TEXT,
  "game_status_timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "loans" (
  "id" SERIAL PRIMARY KEY,
  "player_id" INTEGER REFERENCES "players"("id"),
  "amount" DECIMAL(10,2),
  "interest_rate" DECIMAL(5,2),
  "term" INTEGER,
  "status" VARCHAR(255),
  "game_status_timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "loan_restructuring" (
  "id" SERIAL PRIMARY KEY,
  "loan_id" INTEGER REFERENCES "loans"("id"),
  "new_amount" DECIMAL(10,2),
  "new_interest_rate" DECIMAL(5,2),
  "new_term" INTEGER,
  "is_approved" BOOLEAN,
  "game_status_timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "investments" (
  "id" SERIAL PRIMARY KEY,
  "player_id" INTEGER REFERENCES "players"("id"),
  "type" VARCHAR(255),
  "amount" DECIMAL(10,2),
  "expected_return" DECIMAL(10,2),
  "game_status_timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "subscriptions" (
  "id" SERIAL PRIMARY KEY,
  "player_id" INTEGER REFERENCES "players"("id"),
  "name" VARCHAR(255),
  "monthly_cost" DECIMAL(10,2),
  "start_date" DATE,
  "end_date" DATE,
  "is_active" BOOLEAN
);

CREATE TABLE "unexpected_expenses" (
  "id" SERIAL PRIMARY KEY,
  "player_id" INTEGER REFERENCES "players"("id"),
  "type" VARCHAR(255),
  "amount" DECIMAL(10,2),
  "is_insured" BOOLEAN,
  "game_status_timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "inflation" (
  "id" SERIAL PRIMARY KEY,
  "year" INTEGER,
  "percentage" DECIMAL(5,2),
  "impact" TEXT
); 
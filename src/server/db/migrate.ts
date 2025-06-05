import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";

// Read from environment variables
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const main = async () => {
  console.log("Migration started...");

  // Create a PostgreSQL connection pool
  const pool = new Pool({
    connectionString,
  });

  const db = drizzle(pool);

  // This will run migrations on the database, skipping the ones already applied
  await migrate(db, { migrationsFolder: "./src/db/migrations" });

  // Don't forget to close the pool
  await pool.end();

  console.log("Migration completed successfully");
};

main().catch((err) => {
  console.error("Migration failed!");
  console.error(err);
  process.exit(1);
});

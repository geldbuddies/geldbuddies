import { neon } from '@neondatabase/serverless';
import 'dotenv/config';
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http';
import * as schema from './schemas';

// Read from environment variables
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const sql = neon(connectionString);
const db = drizzleNeon(sql, { schema });

// Export the database connection
export { db };

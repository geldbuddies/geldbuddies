import { neon, neonConfig } from '@neondatabase/serverless';
import 'dotenv/config';
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http';
import * as schema from './schemas';

// Read from environment variables
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Configure Neon for different environments
if (process.env.NODE_ENV === 'development') {
  // For local development, use direct connection to Docker database
  // The DATABASE_URL from .env will be used directly

  // Configure Neon proxy settings for local development
  neonConfig.fetchEndpoint = (host) => {
    const [protocol, port] = host === 'db.localtest.me' ? ['http', 4444] : ['https', 443];
    return `${protocol}://${host}:${port}/sql`;
  };
}

const sql = neon(connectionString);
const db = drizzleNeon(sql, { schema });

// Export the database connection
export { db };

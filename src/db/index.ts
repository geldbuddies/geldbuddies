import 'dotenv/config'
import { drizzle } from 'drizzle-orm/neon-http'

import { neon } from '@neondatabase/serverless'
import * as schema from './schemas'

// Read from environment variables
const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set')
}

// Create a Neon HTTP connection
const sql = neon(connectionString)

// Create and export the database connection
export const db = drizzle(sql, { schema })

import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schemas'

// Read from environment variables
const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set')
}

// Create a PostgreSQL connection pool with better settings for development
const pool = new Pool({
  connectionString,
  max: 10, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 5000, // How long to wait for a connection to become available
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: true } : false
})

// Add error handler for unexpected pool errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client', err)
  process.exit(-1)
})

// Test connection when starting the app
const testConnection = async () => {
  const client = await pool.connect()
  try {
    await client.query('SELECT NOW()')
    console.log('PostgreSQL connection successful')
  } catch (err) {
    console.error('PostgreSQL connection error:', err)
    throw err
  } finally {
    client.release()
  }
}

// Run the test but don't block app startup
testConnection().catch(err => {
  console.error('Database connection test failed:', err)
})

// Create and export the database connection
export const db = drizzle(pool, { schema })

// Export pool for direct SQL queries if needed
export { pool }

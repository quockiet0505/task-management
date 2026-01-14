
import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

const pool = new Pool({
  connectionString: "postgres://postgres:12345678@localhost:5432/task_management"

})

console.log("[DB INIT] Pool created.", pool.options.connectionString)

console.log("[DB INIT] Connecting to database...", typeof process.env.DATABASE_URL, process.env.DATABASE_URL)
export const db = drizzle(pool)
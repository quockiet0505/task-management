// import { SQLDatabase } from "encore.dev/storage/sqldb";
// import { drizzle } from "drizzle-orm/node-postgres";

// // Define the application database
// const TaskDB = new SQLDatabase("taskdb1", {
//   migrations: {
//     path: "migrations",
//     source: "drizzle",
//   },
// });

// export const db = drizzle(TaskDB.connectionString);
// export const connectionString = TaskDB.connectionString;

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as fs from "fs";
import * as dotenv from "dotenv";

// Load Docker Secret in production
if (fs.existsSync("/.env")) {
  dotenv.config({ path: "/.env" });
} else {
  // Load local .env for development
  dotenv.config(); 
}

export const connectionString = process.env.DATABASE_URL as string;

// Connect to Postgres
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);
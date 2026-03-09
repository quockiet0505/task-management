import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as fs from "fs";
import * as dotenv from "dotenv";

// Load Docker secret
if (fs.existsSync("/run/secrets/app_secret")) {
  dotenv.config({ path: "/run/secrets/app_secret" });
} else {
  dotenv.config();
}

export const connectionString = process.env.DATABASE_URL as string;

const pool = new Pool({
  connectionString,
});

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

export const db = drizzle(pool);
import { SQLDatabase } from "encore.dev/storage/sqldb";
import { drizzle } from "drizzle-orm/node-postgres";

// Define the application database
const TaskDB = new SQLDatabase("taskdb", {
  migrations: {
    path: "migrations",
    source: "drizzle",
  },
});

export const db = drizzle(TaskDB.connectionString);
export const connectionString = TaskDB.connectionString;

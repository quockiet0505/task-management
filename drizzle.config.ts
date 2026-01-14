// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
     dialect: "postgresql",
     schema: "./db/schema/*.ts",
     // nơi sinh migration
     out: "./drizzle/migrations",
     dbCredentials: {
          url: process.env.DATABASE_URL!,
     },
   });
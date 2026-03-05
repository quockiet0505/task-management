import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  schema: './db/schema/*', 
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    // Default to localhost for IAP Tunnel migration
    url: process.env.DATABASE_URL || 'postgres://admin:adminpassword@localhost:5432/appdb', 
  },
});
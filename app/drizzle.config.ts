import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
 
  schema: './db/schema/*.ts', 
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgres://admin:adminpassword@127.0.0.1:5488/appdb?sslmode=disable', 
  },
  verbose: true,
  strict: true,
});
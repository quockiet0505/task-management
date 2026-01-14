import { betterAuth } from "better-auth"

export const auth = betterAuth({
  database: process.env.DATABASE_URL!,
  secret: process.env.AUTH_SECRET!,
  emailAndPassword: { enabled: true },
  session: { expiresIn: 60 * 60 * 24 * 7 },
})

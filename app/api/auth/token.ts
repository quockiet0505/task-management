import jwt from "jsonwebtoken"

const SECRET = process.env.AUTH_SECRET || "super-secret-key-123"

export function signToken(payload: { userID: string }) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" })
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET) as { userID: string }
}

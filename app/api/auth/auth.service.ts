import bcrypt from "bcryptjs"
import { APIError, ErrCode } from "encore.dev/api"
import { AuthRepo } from "./auth.repo"
import type { RegisterInput, LoginInput } from "./auth.types"
import jwt from "jsonwebtoken"
import { secret } from "encore.dev/config"


const AUTH_SECRET = secret("AUTH_SECRET")

export const AuthService = {
  // register
  async register(input: RegisterInput) {
    const existing = await AuthRepo.findUserByEmail(input.email)
    if (existing) {
      throw new APIError(ErrCode.AlreadyExists, "Email already exists")
    }

    const hash = await bcrypt.hash(input.password, 10)
    const user = await AuthRepo.createUser({ email: input.email, passwordHash: hash })

    // Create 
    const token = jwt.sign({ userID: user.id }, AUTH_SECRET(), { expiresIn: "7d" })
    return { userId: user.id, token}
  },

  // login
  async login(input: LoginInput) {
    const user = await AuthRepo.findUserByEmail(input.email)
    if (!user) {
      throw new APIError(ErrCode.Unauthenticated, "Invalid email or password")
    }

    // check isActive
    if (!user.isActive) {
      throw new APIError(
        ErrCode.PermissionDenied,
        "Account has been disabled"
      )
    }
  
    const ok = await bcrypt.compare(input.password, user.passwordHash)
    if (!ok) {
      throw new APIError(ErrCode.Unauthenticated, "Invalid email or password")
    }

    const token = jwt.sign({ userID: user.id }, AUTH_SECRET(), { expiresIn: "7d" })
    return { userId: user.id, token }
  },
}

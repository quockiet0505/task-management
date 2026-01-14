import bcrypt from "bcryptjs"
import { APIError, ErrCode } from "encore.dev/api"
import { AuthRepo } from "./auth.repo"
import type { RegisterInput, LoginInput } from "./auth.types"
import jwt from "jsonwebtoken"
import { secret } from "encore.dev/config"


const AUTH_SECRET = secret("AUTH_SECRET")

export const AuthService = {
  // REGISTER
  async register(input: RegisterInput) {
    const existing = await AuthRepo.findUserByEmail(input.email)
    if (existing) {
      throw new APIError(ErrCode.AlreadyExists, "Email already exists")
    }

    const hash = await bcrypt.hash(input.password, 10)
    const user = await AuthRepo.createUser({ email: input.email, passwordHash: hash })

    // Create a default organization for the user and add as admin
    const org = await AuthRepo.createOrganization(`Org of ${input.email}`)
    await AuthRepo.addMember({ userId: user.id, organizationId: org.id, role: "admin" })

    const token = jwt.sign({ userID: user.id }, AUTH_SECRET(), { expiresIn: "7d" })
    return { userId: user.id, token, defaultOrganizationId: org.id }
  },

  // LOGIN
  async login(input: LoginInput) {
    const user = await AuthRepo.findUserByEmail(input.email)
    if (!user) {
      throw new APIError(ErrCode.Unauthenticated, "Invalid email or password")
    }

    const ok = await bcrypt.compare(input.password, user.passwordHash)
    if (!ok) {
      throw new APIError(ErrCode.Unauthenticated, "Invalid email or password")
    }

    const token = jwt.sign({ userID: user.id }, AUTH_SECRET(), { expiresIn: "7d" })
    return { userId: user.id, token }
  },
}

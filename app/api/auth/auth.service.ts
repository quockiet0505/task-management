import bcrypt from "bcryptjs"
import { APIError, ErrCode } from "encore.dev/api"
import { AuthRepo } from "./auth.repo"
import type { RegisterInput, LoginInput } from "./auth.types"
import { signToken } from "./token"

export const AuthService = {
  // REGISTER
  async register(input: RegisterInput) {
    const existing = await AuthRepo.findUserByEmail(input.email)
    if (existing) {
      throw new APIError(
        ErrCode.AlreadyExists,
        "Email already exists"
      )
    }

    const passwordHash = await bcrypt.hash(input.password, 10)

    const user = await AuthRepo.createUser({
      email: input.email,
      passwordHash,
    })

    //  JWT 
    const token = signToken({ userID: user.id })

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    }
  },


  // LOGIN
  async login(input: LoginInput) {
    const user = await AuthRepo.findUserByEmail(input.email)
    if (!user) {
      throw new APIError(
        ErrCode.Unauthenticated,
        "Invalid email or password"
      )
    }

    const ok = await bcrypt.compare(
      input.password,
      user.passwordHash
    )
    if (!ok) {
      throw new APIError(
        ErrCode.Unauthenticated,
        "Invalid email or password"
      )
    }

    const token = signToken({ userID: user.id })

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    }
  },
}

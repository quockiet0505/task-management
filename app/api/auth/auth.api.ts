import { api } from "encore.dev/api"
import { AuthService } from "./auth.service"
import { RegisterSchema, LoginSchema } from "../../../lib/validation/auth"
import type { RegisterInput, LoginInput } from "./auth.types"

export const register = api(
  { method: "POST", path: "/v1/auth/register" },
  async (body: RegisterInput) => {
    const input = RegisterSchema.parse(body)
    return AuthService.register(input)
  }
)

export const login = api(
  { method: "POST", path: "/v1/auth/login" },
  async (body: LoginInput) => {
    const input = LoginSchema.parse(body)
    return AuthService.login(input)
  }
)

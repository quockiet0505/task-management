import { api } from "encore.dev/api";
import { AuthService } from "./auth.service";
import { RegisterSchema, LoginSchema } from "../../lib/validation/auth";
import type { RegisterInput, LoginInput } from "./auth.types";

// register new user
export const register = api(
  { expose: true, method: "POST", path: "/v1/auth/register" },
  async (body: RegisterInput): Promise<{ auth: { userId: string; token: string } }> => {
    const input = RegisterSchema.parse(body);
    const result = await AuthService.register(input);

    return {
      auth: result
    };
  }
);

// login
export const login = api(
  { expose: true, method: "POST", path: "/v1/auth/login" },
  async (body: LoginInput): Promise<{ auth: { userId: string; token: string } }> => {
    const input = LoginSchema.parse(body);
    const result = await AuthService.login(input);

    return {
      auth: result
    };
  }
);
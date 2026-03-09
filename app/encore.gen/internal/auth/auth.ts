import { getAuthData as _getAuthData } from "encore.dev/internal/codegen/auth";
import { authHandlerInstance as _auth_authHandlerInstance } from "../../../api\\auth\\auth.handler.js";

export type AuthData = Awaited<ReturnType<typeof _auth_authHandlerInstance>>;

export function getAuthData(): AuthData | null {
    return _getAuthData()
}

declare module "encore.dev/api" {
  interface CallOpts {
    authData?: AuthData;
  }
}


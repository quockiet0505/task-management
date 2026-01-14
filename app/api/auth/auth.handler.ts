// import { authHandler } from "encore.dev/auth"
// import { Header, APIError, ErrCode } from "encore.dev/api"
// import { auth } from "./auth.config"
// import type { AuthData } from "./auth.types"

// interface AuthParams {
//   authorization: Header<"Authorization">
// }

// export const authHandlerInstance = authHandler<AuthParams, AuthData>(
//   async ({ authorization }) => {
//     if (!authorization) {
//       throw new APIError(ErrCode.Unauthenticated, "Missing Authorization header")
//     }

//     const token = authorization.replace("Bearer ", "")
//     const session = await auth.api.getSession({
//       headers: { Authorization: `Bearer ${token}` },
//     })

//     if (!session?.user) {
//       throw new APIError(ErrCode.Unauthenticated, "Invalid session")
//     }

//     return {
//       userID: session.user.id,
//     }
//   }
// )
import { authHandler } from "encore.dev/auth"
import { Header, APIError, ErrCode } from "encore.dev/api"
import { verifyToken } from "./token"

interface AuthParams {
  authorization: Header<"Authorization">
}

export const authHandlerInstance = authHandler<
  AuthParams,
  { userID: string }
>(async ({ authorization }) => {
  if (!authorization) {
    throw new APIError(
      ErrCode.Unauthenticated,
      "Missing Authorization header"
    )
  }

  const token = authorization.replace("Bearer ", "")

  try {
    const payload = verifyToken(token)
    return { userID: payload.userID }
  } catch {
    throw new APIError(
      ErrCode.Unauthenticated,
      "Invalid token"
    )
  }
})

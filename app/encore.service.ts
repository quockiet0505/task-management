import { Service } from "encore.dev/service";
import { Gateway } from "encore.dev/api";
import { authHandlerInstance } from "./api/auth/auth.handler";

export default new Service("app");

// Register the auth handler so Authorization headers are processed
export const gateway = new Gateway({
  authHandler: authHandlerInstance,
});

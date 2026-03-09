import { CallOpts } from "encore.dev/api";

type Parameters<T> = T extends (...args: infer P) => unknown ? P : never;
type WithCallOpts<T extends (...args: any) => any> = (
  ...args: [...Parameters<T>, opts?: CallOpts]
) => ReturnType<T>;

import { register as register_handler } from "../../../../api/auth/auth.api.js";
declare const register: WithCallOpts<typeof register_handler>;
export { register };

import { login as login_handler } from "../../../../api/auth/auth.api.js";
declare const login: WithCallOpts<typeof login_handler>;
export { login };



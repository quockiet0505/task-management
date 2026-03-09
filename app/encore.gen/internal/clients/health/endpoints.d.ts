import { CallOpts } from "encore.dev/api";

type Parameters<T> = T extends (...args: infer P) => unknown ? P : never;
type WithCallOpts<T extends (...args: any) => any> = (
  ...args: [...Parameters<T>, opts?: CallOpts]
) => ReturnType<T>;

import { health as health_handler } from "../../../../api/health/health.api.js";
declare const health: WithCallOpts<typeof health_handler>;
export { health };



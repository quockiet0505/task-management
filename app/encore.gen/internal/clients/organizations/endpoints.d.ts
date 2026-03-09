import { CallOpts } from "encore.dev/api";

type Parameters<T> = T extends (...args: infer P) => unknown ? P : never;
type WithCallOpts<T extends (...args: any) => any> = (
  ...args: [...Parameters<T>, opts?: CallOpts]
) => ReturnType<T>;

import { createOrganization as createOrganization_handler } from "../../../../api/organizations/org.api.js";
declare const createOrganization: WithCallOpts<typeof createOrganization_handler>;
export { createOrganization };

import { getOrganization as getOrganization_handler } from "../../../../api/organizations/org.api.js";
declare const getOrganization: WithCallOpts<typeof getOrganization_handler>;
export { getOrganization };



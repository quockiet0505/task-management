import { CallOpts } from "encore.dev/api";

type Parameters<T> = T extends (...args: infer P) => unknown ? P : never;
type WithCallOpts<T extends (...args: any) => any> = (
  ...args: [...Parameters<T>, opts?: CallOpts]
) => ReturnType<T>;

import { listMembers as listMembers_handler } from "../../../../api/members/member.api.js";
declare const listMembers: WithCallOpts<typeof listMembers_handler>;
export { listMembers };

import { createMember as createMember_handler } from "../../../../api/members/member.api.js";
declare const createMember: WithCallOpts<typeof createMember_handler>;
export { createMember };

import { updateMember as updateMember_handler } from "../../../../api/members/member.api.js";
declare const updateMember: WithCallOpts<typeof updateMember_handler>;
export { updateMember };

import { deleteMember as deleteMember_handler } from "../../../../api/members/member.api.js";
declare const deleteMember: WithCallOpts<typeof deleteMember_handler>;
export { deleteMember };



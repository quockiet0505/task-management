import { CallOpts } from "encore.dev/api";

type Parameters<T> = T extends (...args: infer P) => unknown ? P : never;
type WithCallOpts<T extends (...args: any) => any> = (
  ...args: [...Parameters<T>, opts?: CallOpts]
) => ReturnType<T>;

import { register as register_handler } from "../../../../api\\auth\\auth.api.js";
declare const register: WithCallOpts<typeof register_handler>;
export { register };

import { login as login_handler } from "../../../../api\\auth\\auth.api.js";
declare const login: WithCallOpts<typeof login_handler>;
export { login };

import { health as health_handler } from "../../../../api\\health\\health.api.js";
declare const health: WithCallOpts<typeof health_handler>;
export { health };

import { listMembersFromOrg as listMembersFromOrg_handler } from "../../../../api\\members\\member.api.js";
declare const listMembersFromOrg: WithCallOpts<typeof listMembersFromOrg_handler>;
export { listMembersFromOrg };

import { updateMemberFromOrg as updateMemberFromOrg_handler } from "../../../../api\\members\\member.api.js";
declare const updateMemberFromOrg: WithCallOpts<typeof updateMemberFromOrg_handler>;
export { updateMemberFromOrg };

import { deleteMemberFromOrg as deleteMemberFromOrg_handler } from "../../../../api\\members\\member.api.js";
declare const deleteMemberFromOrg: WithCallOpts<typeof deleteMemberFromOrg_handler>;
export { deleteMemberFromOrg };

import { addToOrganization as addToOrganization_handler } from "../../../../api\\members\\member.api.js";
declare const addToOrganization: WithCallOpts<typeof addToOrganization_handler>;
export { addToOrganization };

import { createOrganization as createOrganization_handler } from "../../../../api\\organizations\\org.api.js";
declare const createOrganization: WithCallOpts<typeof createOrganization_handler>;
export { createOrganization };

import { getOrganizationById as getOrganizationById_handler } from "../../../../api\\organizations\\org.api.js";
declare const getOrganizationById: WithCallOpts<typeof getOrganizationById_handler>;
export { getOrganizationById };

import { getMyOrganization as getMyOrganization_handler } from "../../../../api\\organizations\\org.api.js";
declare const getMyOrganization: WithCallOpts<typeof getMyOrganization_handler>;
export { getMyOrganization };

import { listOrganizations as listOrganizations_handler } from "../../../../api\\organizations\\org.api.js";
declare const listOrganizations: WithCallOpts<typeof listOrganizations_handler>;
export { listOrganizations };

import { listTasks as listTasks_handler } from "../../../../api\\tasks\\task.api.js";
declare const listTasks: WithCallOpts<typeof listTasks_handler>;
export { listTasks };

import { getTaskById as getTaskById_handler } from "../../../../api\\tasks\\task.api.js";
declare const getTaskById: WithCallOpts<typeof getTaskById_handler>;
export { getTaskById };

import { createTask as createTask_handler } from "../../../../api\\tasks\\task.api.js";
declare const createTask: WithCallOpts<typeof createTask_handler>;
export { createTask };

import { updateTask as updateTask_handler } from "../../../../api\\tasks\\task.api.js";
declare const updateTask: WithCallOpts<typeof updateTask_handler>;
export { updateTask };

import { deleteTask as deleteTask_handler } from "../../../../api\\tasks\\task.api.js";
declare const deleteTask: WithCallOpts<typeof deleteTask_handler>;
export { deleteTask };

import { getMe as getMe_handler } from "../../../../api\\users\\user.api.js";
declare const getMe: WithCallOpts<typeof getMe_handler>;
export { getMe };

import { updateMe as updateMe_handler } from "../../../../api\\users\\user.api.js";
declare const updateMe: WithCallOpts<typeof updateMe_handler>;
export { updateMe };

import { adminUpdateUser as adminUpdateUser_handler } from "../../../../api\\users\\user.api.js";
declare const adminUpdateUser: WithCallOpts<typeof adminUpdateUser_handler>;
export { adminUpdateUser };

import { changePassword as changePassword_handler } from "../../../../api\\users\\user.api.js";
declare const changePassword: WithCallOpts<typeof changePassword_handler>;
export { changePassword };



import { registerHandlers, run, type Handler } from "encore.dev/internal/codegen/appinit";
import { Worker, isMainThread } from "node:worker_threads";
import { fileURLToPath } from "node:url";
import { availableParallelism } from "node:os";

import { register as registerImpl0 } from "../../../../../api/auth/auth.api";
import { login as loginImpl1 } from "../../../../../api/auth/auth.api";
import { health as healthImpl2 } from "../../../../../api/health/health.api";
import { listMembersFromOrg as listMembersFromOrgImpl3 } from "../../../../../api/members/member.api";
import { updateMemberFromOrg as updateMemberFromOrgImpl4 } from "../../../../../api/members/member.api";
import { deleteMemberFromOrg as deleteMemberFromOrgImpl5 } from "../../../../../api/members/member.api";
import { addToOrganization as addToOrganizationImpl6 } from "../../../../../api/members/member.api";
import { createOrganization as createOrganizationImpl7 } from "../../../../../api/organizations/org.api";
import { getOrganizationById as getOrganizationByIdImpl8 } from "../../../../../api/organizations/org.api";
import { listTasks as listTasksImpl9 } from "../../../../../api/tasks/task.api";
import { getTaskById as getTaskByIdImpl10 } from "../../../../../api/tasks/task.api";
import { createTask as createTaskImpl11 } from "../../../../../api/tasks/task.api";
import { updateTask as updateTaskImpl12 } from "../../../../../api/tasks/task.api";
import { deleteTask as deleteTaskImpl13 } from "../../../../../api/tasks/task.api";
import { getMe as getMeImpl14 } from "../../../../../api/users/user.api";
import { updateMe as updateMeImpl15 } from "../../../../../api/users/user.api";
import { adminUpdateUser as adminUpdateUserImpl16 } from "../../../../../api/users/user.api";
import * as app_service from "../../../../../encore.service";

const handlers: Handler[] = [
    {
        apiRoute: {
            service:           "app",
            name:              "register",
            handler:           registerImpl0,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: app_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "app",
            name:              "login",
            handler:           loginImpl1,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: app_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "app",
            name:              "health",
            handler:           healthImpl2,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: app_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "app",
            name:              "listMembersFromOrg",
            handler:           listMembersFromOrgImpl3,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: app_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "app",
            name:              "updateMemberFromOrg",
            handler:           updateMemberFromOrgImpl4,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: app_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "app",
            name:              "deleteMemberFromOrg",
            handler:           deleteMemberFromOrgImpl5,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: app_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "app",
            name:              "addToOrganization",
            handler:           addToOrganizationImpl6,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: app_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "app",
            name:              "createOrganization",
            handler:           createOrganizationImpl7,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: app_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "app",
            name:              "getOrganizationById",
            handler:           getOrganizationByIdImpl8,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: app_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "app",
            name:              "listTasks",
            handler:           listTasksImpl9,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: app_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "app",
            name:              "getTaskById",
            handler:           getTaskByIdImpl10,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: app_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "app",
            name:              "createTask",
            handler:           createTaskImpl11,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: app_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "app",
            name:              "updateTask",
            handler:           updateTaskImpl12,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: app_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "app",
            name:              "deleteTask",
            handler:           deleteTaskImpl13,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: app_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "app",
            name:              "getMe",
            handler:           getMeImpl14,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: app_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "app",
            name:              "updateMe",
            handler:           updateMeImpl15,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: app_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "app",
            name:              "adminUpdateUser",
            handler:           adminUpdateUserImpl16,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: app_service.default.cfg.middlewares || [],
    },
];

registerHandlers(handlers);

await run(import.meta.url);

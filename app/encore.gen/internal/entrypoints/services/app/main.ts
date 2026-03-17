import { registerHandlers, run, type Handler } from "encore.dev/internal/codegen/appinit";
import { Worker, isMainThread } from "node:worker_threads";
import { fileURLToPath } from "node:url";
import { availableParallelism } from "node:os";

import { register as registerImpl0 } from "../../../../../api\\auth\\auth.api";
import { login as loginImpl1 } from "../../../../../api\\auth\\auth.api";
import { health as healthImpl2 } from "../../../../../api\\health\\health.api";
import { listMembersFromOrg as listMembersFromOrgImpl3 } from "../../../../../api\\members\\member.api";
import { updateMemberFromOrg as updateMemberFromOrgImpl4 } from "../../../../../api\\members\\member.api";
import { deleteMemberFromOrg as deleteMemberFromOrgImpl5 } from "../../../../../api\\members\\member.api";
import { addToOrganization as addToOrganizationImpl6 } from "../../../../../api\\members\\member.api";
import { createOrganization as createOrganizationImpl7 } from "../../../../../api\\organizations\\org.api";
import { getOrganizationById as getOrganizationByIdImpl8 } from "../../../../../api\\organizations\\org.api";
import { getMyOrganization as getMyOrganizationImpl9 } from "../../../../../api\\organizations\\org.api";
import { listOrganizations as listOrganizationsImpl10 } from "../../../../../api\\organizations\\org.api";
import { listTasks as listTasksImpl11 } from "../../../../../api\\tasks\\task.api";
import { getTaskById as getTaskByIdImpl12 } from "../../../../../api\\tasks\\task.api";
import { createTask as createTaskImpl13 } from "../../../../../api\\tasks\\task.api";
import { updateTask as updateTaskImpl14 } from "../../../../../api\\tasks\\task.api";
import { deleteTask as deleteTaskImpl15 } from "../../../../../api\\tasks\\task.api";
import { getMe as getMeImpl16 } from "../../../../../api\\users\\user.api";
import { updateMe as updateMeImpl17 } from "../../../../../api\\users\\user.api";
import { adminUpdateUser as adminUpdateUserImpl18 } from "../../../../../api\\users\\user.api";
import { changePassword as changePasswordImpl19 } from "../../../../../api\\users\\user.api";
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
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
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
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
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
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
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
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
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
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
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
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: app_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "app",
            name:              "getMyOrganization",
            handler:           getMyOrganizationImpl9,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: app_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "app",
            name:              "listOrganizations",
            handler:           listOrganizationsImpl10,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: app_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "app",
            name:              "listTasks",
            handler:           listTasksImpl11,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: app_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "app",
            name:              "getTaskById",
            handler:           getTaskByIdImpl12,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: app_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "app",
            name:              "createTask",
            handler:           createTaskImpl13,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: app_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "app",
            name:              "updateTask",
            handler:           updateTaskImpl14,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: app_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "app",
            name:              "deleteTask",
            handler:           deleteTaskImpl15,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: app_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "app",
            name:              "getMe",
            handler:           getMeImpl16,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: app_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "app",
            name:              "updateMe",
            handler:           updateMeImpl17,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: app_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "app",
            name:              "adminUpdateUser",
            handler:           adminUpdateUserImpl18,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: app_service.default.cfg.middlewares || [],
    },
    {
        apiRoute: {
            service:           "app",
            name:              "changePassword",
            handler:           changePasswordImpl19,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":true,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: app_service.default.cfg.middlewares || [],
    },
];

registerHandlers(handlers);

await run(import.meta.url);

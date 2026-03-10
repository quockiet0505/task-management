import { registerGateways, registerHandlers, run, type Handler } from "encore.dev/internal/codegen/appinit";

import { gateway as api_gatewayGW } from "../../../../encore.service";
import { register as app_registerImpl0 } from "../../../../api\\auth\\auth.api";
import { login as app_loginImpl1 } from "../../../../api\\auth\\auth.api";
import { health as app_healthImpl2 } from "../../../../api\\health\\health.api";
import { listMembersFromOrg as app_listMembersFromOrgImpl3 } from "../../../../api\\members\\member.api";
import { updateMemberFromOrg as app_updateMemberFromOrgImpl4 } from "../../../../api\\members\\member.api";
import { deleteMemberFromOrg as app_deleteMemberFromOrgImpl5 } from "../../../../api\\members\\member.api";
import { addToOrganization as app_addToOrganizationImpl6 } from "../../../../api\\members\\member.api";
import { createOrganization as app_createOrganizationImpl7 } from "../../../../api\\organizations\\org.api";
import { getOrganizationById as app_getOrganizationByIdImpl8 } from "../../../../api\\organizations\\org.api";
import { getMyOrganization as app_getMyOrganizationImpl9 } from "../../../../api\\organizations\\org.api";
import { listOrganizations as app_listOrganizationsImpl10 } from "../../../../api\\organizations\\org.api";
import { listTasks as app_listTasksImpl11 } from "../../../../api\\tasks\\task.api";
import { getTaskById as app_getTaskByIdImpl12 } from "../../../../api\\tasks\\task.api";
import { createTask as app_createTaskImpl13 } from "../../../../api\\tasks\\task.api";
import { updateTask as app_updateTaskImpl14 } from "../../../../api\\tasks\\task.api";
import { deleteTask as app_deleteTaskImpl15 } from "../../../../api\\tasks\\task.api";
import { getMe as app_getMeImpl16 } from "../../../../api\\users\\user.api";
import { updateMe as app_updateMeImpl17 } from "../../../../api\\users\\user.api";
import { adminUpdateUser as app_adminUpdateUserImpl18 } from "../../../../api\\users\\user.api";
import * as app_service from "../../../../encore.service";


const gateways: any[] = [
    api_gatewayGW,
];

const handlers: Handler[] = [
    {
        apiRoute: {
            service:           "app",
            name:              "register",
            handler:           app_registerImpl0,
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
            handler:           app_loginImpl1,
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
            handler:           app_healthImpl2,
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
            handler:           app_listMembersFromOrgImpl3,
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
            handler:           app_updateMemberFromOrgImpl4,
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
            handler:           app_deleteMemberFromOrgImpl5,
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
            handler:           app_addToOrganizationImpl6,
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
            handler:           app_createOrganizationImpl7,
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
            handler:           app_getOrganizationByIdImpl8,
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
            name:              "getMyOrganization",
            handler:           app_getMyOrganizationImpl9,
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
            name:              "listOrganizations",
            handler:           app_listOrganizationsImpl10,
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
            name:              "listTasks",
            handler:           app_listTasksImpl11,
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
            handler:           app_getTaskByIdImpl12,
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
            handler:           app_createTaskImpl13,
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
            handler:           app_updateTaskImpl14,
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
            handler:           app_deleteTaskImpl15,
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
            handler:           app_getMeImpl16,
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
            handler:           app_updateMeImpl17,
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
            handler:           app_adminUpdateUserImpl18,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: app_service.default.cfg.middlewares || [],
    },
];

registerGateways(gateways);
registerHandlers(handlers);

await run(import.meta.url);

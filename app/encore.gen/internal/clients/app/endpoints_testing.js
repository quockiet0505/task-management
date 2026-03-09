import { apiCall, streamIn, streamOut, streamInOut } from "encore.dev/internal/codegen/api";
import { registerTestHandler } from "encore.dev/internal/codegen/appinit";

import * as app_service from "../../../../encore.service";

export async function register(params, opts) {
    const handler = (await import("../../../../api\\auth\\auth.api")).register;
    registerTestHandler({
        apiRoute: { service: "app", name: "register", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: app_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("app", "register", params, opts);
}

export async function login(params, opts) {
    const handler = (await import("../../../../api\\auth\\auth.api")).login;
    registerTestHandler({
        apiRoute: { service: "app", name: "login", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: app_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("app", "login", params, opts);
}

export async function health(params, opts) {
    const handler = (await import("../../../../api\\health\\health.api")).health;
    registerTestHandler({
        apiRoute: { service: "app", name: "health", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: app_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":true,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("app", "health", params, opts);
}

export async function listMembersFromOrg(params, opts) {
    const handler = (await import("../../../../api\\members\\member.api")).listMembersFromOrg;
    registerTestHandler({
        apiRoute: { service: "app", name: "listMembersFromOrg", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: app_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("app", "listMembersFromOrg", params, opts);
}

export async function updateMemberFromOrg(params, opts) {
    const handler = (await import("../../../../api\\members\\member.api")).updateMemberFromOrg;
    registerTestHandler({
        apiRoute: { service: "app", name: "updateMemberFromOrg", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: app_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("app", "updateMemberFromOrg", params, opts);
}

export async function deleteMemberFromOrg(params, opts) {
    const handler = (await import("../../../../api\\members\\member.api")).deleteMemberFromOrg;
    registerTestHandler({
        apiRoute: { service: "app", name: "deleteMemberFromOrg", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: app_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("app", "deleteMemberFromOrg", params, opts);
}

export async function addToOrganization(params, opts) {
    const handler = (await import("../../../../api\\members\\member.api")).addToOrganization;
    registerTestHandler({
        apiRoute: { service: "app", name: "addToOrganization", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: app_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("app", "addToOrganization", params, opts);
}

export async function createOrganization(params, opts) {
    const handler = (await import("../../../../api\\organizations\\org.api")).createOrganization;
    registerTestHandler({
        apiRoute: { service: "app", name: "createOrganization", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: app_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("app", "createOrganization", params, opts);
}

export async function getOrganizationById(params, opts) {
    const handler = (await import("../../../../api\\organizations\\org.api")).getOrganizationById;
    registerTestHandler({
        apiRoute: { service: "app", name: "getOrganizationById", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: app_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":false,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("app", "getOrganizationById", params, opts);
}

export async function listTasks(params, opts) {
    const handler = (await import("../../../../api\\tasks\\task.api")).listTasks;
    registerTestHandler({
        apiRoute: { service: "app", name: "listTasks", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: app_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("app", "listTasks", params, opts);
}

export async function getTaskById(params, opts) {
    const handler = (await import("../../../../api\\tasks\\task.api")).getTaskById;
    registerTestHandler({
        apiRoute: { service: "app", name: "getTaskById", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: app_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("app", "getTaskById", params, opts);
}

export async function createTask(params, opts) {
    const handler = (await import("../../../../api\\tasks\\task.api")).createTask;
    registerTestHandler({
        apiRoute: { service: "app", name: "createTask", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: app_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("app", "createTask", params, opts);
}

export async function updateTask(params, opts) {
    const handler = (await import("../../../../api\\tasks\\task.api")).updateTask;
    registerTestHandler({
        apiRoute: { service: "app", name: "updateTask", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: app_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("app", "updateTask", params, opts);
}

export async function deleteTask(params, opts) {
    const handler = (await import("../../../../api\\tasks\\task.api")).deleteTask;
    registerTestHandler({
        apiRoute: { service: "app", name: "deleteTask", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: app_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("app", "deleteTask", params, opts);
}

export async function getMe(params, opts) {
    const handler = (await import("../../../../api\\users\\user.api")).getMe;
    registerTestHandler({
        apiRoute: { service: "app", name: "getMe", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: app_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("app", "getMe", params, opts);
}

export async function updateMe(params, opts) {
    const handler = (await import("../../../../api\\users\\user.api")).updateMe;
    registerTestHandler({
        apiRoute: { service: "app", name: "updateMe", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: app_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("app", "updateMe", params, opts);
}

export async function adminUpdateUser(params, opts) {
    const handler = (await import("../../../../api\\users\\user.api")).adminUpdateUser;
    registerTestHandler({
        apiRoute: { service: "app", name: "adminUpdateUser", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: app_service.default.cfg.middlewares || [],
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("app", "adminUpdateUser", params, opts);
}


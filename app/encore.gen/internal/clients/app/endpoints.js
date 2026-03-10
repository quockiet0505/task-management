import { apiCall, streamIn, streamOut, streamInOut } from "encore.dev/internal/codegen/api";

const TEST_ENDPOINTS = typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test"
    ? await import("./endpoints_testing.js")
    : null;

export async function register(params, opts) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.register(params, opts);
    }

    return apiCall("app", "register", params, opts);
}
export async function login(params, opts) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.login(params, opts);
    }

    return apiCall("app", "login", params, opts);
}
export async function health(opts) {
    const params = undefined;
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.health(params, opts);
    }

    return apiCall("app", "health", params, opts);
}
export async function listMembersFromOrg(params, opts) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.listMembersFromOrg(params, opts);
    }

    return apiCall("app", "listMembersFromOrg", params, opts);
}
export async function updateMemberFromOrg(params, opts) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.updateMemberFromOrg(params, opts);
    }

    return apiCall("app", "updateMemberFromOrg", params, opts);
}
export async function deleteMemberFromOrg(params, opts) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.deleteMemberFromOrg(params, opts);
    }

    return apiCall("app", "deleteMemberFromOrg", params, opts);
}
export async function addToOrganization(params, opts) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.addToOrganization(params, opts);
    }

    return apiCall("app", "addToOrganization", params, opts);
}
export async function createOrganization(params, opts) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.createOrganization(params, opts);
    }

    return apiCall("app", "createOrganization", params, opts);
}
export async function getOrganizationById(params, opts) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getOrganizationById(params, opts);
    }

    return apiCall("app", "getOrganizationById", params, opts);
}
export async function getMyOrganization(opts) {
    const params = undefined;
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getMyOrganization(params, opts);
    }

    return apiCall("app", "getMyOrganization", params, opts);
}
export async function listOrganizations(opts) {
    const params = undefined;
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.listOrganizations(params, opts);
    }

    return apiCall("app", "listOrganizations", params, opts);
}
export async function listTasks(params, opts) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.listTasks(params, opts);
    }

    return apiCall("app", "listTasks", params, opts);
}
export async function getTaskById(params, opts) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getTaskById(params, opts);
    }

    return apiCall("app", "getTaskById", params, opts);
}
export async function createTask(params, opts) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.createTask(params, opts);
    }

    return apiCall("app", "createTask", params, opts);
}
export async function updateTask(params, opts) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.updateTask(params, opts);
    }

    return apiCall("app", "updateTask", params, opts);
}
export async function deleteTask(params, opts) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.deleteTask(params, opts);
    }

    return apiCall("app", "deleteTask", params, opts);
}
export async function getMe(opts) {
    const params = undefined;
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getMe(params, opts);
    }

    return apiCall("app", "getMe", params, opts);
}
export async function updateMe(params, opts) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.updateMe(params, opts);
    }

    return apiCall("app", "updateMe", params, opts);
}
export async function adminUpdateUser(params, opts) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.adminUpdateUser(params, opts);
    }

    return apiCall("app", "adminUpdateUser", params, opts);
}

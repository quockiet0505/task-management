import { apiCall, streamIn, streamOut, streamInOut } from "encore.dev/internal/codegen/api";

const TEST_ENDPOINTS = typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test"
    ? await import("./endpoints_testing.js")
    : null;

export async function listTasks(params, opts) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.listTasks(params, opts);
    }

    return apiCall("tasks", "listTasks", params, opts);
}
export async function getTask(params, opts) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.getTask(params, opts);
    }

    return apiCall("tasks", "getTask", params, opts);
}
export async function createTask(params, opts) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.createTask(params, opts);
    }

    return apiCall("tasks", "createTask", params, opts);
}
export async function updateTask(params, opts) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.updateTask(params, opts);
    }

    return apiCall("tasks", "updateTask", params, opts);
}
export async function deleteTask(params, opts) {
    if (typeof ENCORE_DROP_TESTS === "undefined" && process.env.NODE_ENV === "test") {
        return TEST_ENDPOINTS.deleteTask(params, opts);
    }

    return apiCall("tasks", "deleteTask", params, opts);
}

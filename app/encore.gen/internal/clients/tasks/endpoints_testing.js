import { apiCall, streamIn, streamOut, streamInOut } from "encore.dev/internal/codegen/api";
import { registerTestHandler } from "encore.dev/internal/codegen/appinit";


export async function listTasks(params, opts) {
    const handler = (await import("../../../../app\\api\\tasks\\task.api")).listTasks;
    registerTestHandler({
        apiRoute: { service: "tasks", name: "listTasks", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: [],
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("tasks", "listTasks", params, opts);
}

export async function getTask(params, opts) {
    const handler = (await import("../../../../app\\api\\tasks\\task.api")).getTask;
    registerTestHandler({
        apiRoute: { service: "tasks", name: "getTask", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: [],
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("tasks", "getTask", params, opts);
}

export async function createTask(params, opts) {
    const handler = (await import("../../../../app\\api\\tasks\\task.api")).createTask;
    registerTestHandler({
        apiRoute: { service: "tasks", name: "createTask", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: [],
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("tasks", "createTask", params, opts);
}

export async function updateTask(params, opts) {
    const handler = (await import("../../../../app\\api\\tasks\\task.api")).updateTask;
    registerTestHandler({
        apiRoute: { service: "tasks", name: "updateTask", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: [],
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("tasks", "updateTask", params, opts);
}

export async function deleteTask(params, opts) {
    const handler = (await import("../../../../app\\api\\tasks\\task.api")).deleteTask;
    registerTestHandler({
        apiRoute: { service: "tasks", name: "deleteTask", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: [],
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("tasks", "deleteTask", params, opts);
}


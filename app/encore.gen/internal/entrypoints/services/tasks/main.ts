import { registerHandlers, run, type Handler } from "encore.dev/internal/codegen/appinit";
import { Worker, isMainThread } from "node:worker_threads";
import { fileURLToPath } from "node:url";
import { availableParallelism } from "node:os";

import { listTasks as listTasksImpl0 } from "../../../../../api/tasks/task.api";
import { getTask as getTaskImpl1 } from "../../../../../api/tasks/task.api";
import { createTask as createTaskImpl2 } from "../../../../../api/tasks/task.api";
import { updateTask as updateTaskImpl3 } from "../../../../../api/tasks/task.api";
import { deleteTask as deleteTaskImpl4 } from "../../../../../api/tasks/task.api";

const handlers: Handler[] = [
    {
        apiRoute: {
            service:           "tasks",
            name:              "listTasks",
            handler:           listTasksImpl0,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: [],
    },
    {
        apiRoute: {
            service:           "tasks",
            name:              "getTask",
            handler:           getTaskImpl1,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: [],
    },
    {
        apiRoute: {
            service:           "tasks",
            name:              "createTask",
            handler:           createTaskImpl2,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: [],
    },
    {
        apiRoute: {
            service:           "tasks",
            name:              "updateTask",
            handler:           updateTaskImpl3,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: [],
    },
    {
        apiRoute: {
            service:           "tasks",
            name:              "deleteTask",
            handler:           deleteTaskImpl4,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: [],
    },
];

registerHandlers(handlers);

await run(import.meta.url);

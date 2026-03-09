import { registerHandlers, run, type Handler } from "encore.dev/internal/codegen/appinit";
import { Worker, isMainThread } from "node:worker_threads";
import { fileURLToPath } from "node:url";
import { availableParallelism } from "node:os";

import { health as healthImpl0 } from "../../../../../api/health/health.api";

const handlers: Handler[] = [
    {
        apiRoute: {
            service:           "health",
            name:              "health",
            handler:           healthImpl0,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: [],
    },
];

registerHandlers(handlers);

await run(import.meta.url);

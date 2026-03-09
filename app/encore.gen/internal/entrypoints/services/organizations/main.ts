import { registerHandlers, run, type Handler } from "encore.dev/internal/codegen/appinit";
import { Worker, isMainThread } from "node:worker_threads";
import { fileURLToPath } from "node:url";
import { availableParallelism } from "node:os";

import { createOrganization as createOrganizationImpl0 } from "../../../../../api/organizations/org.api";
import { getOrganization as getOrganizationImpl1 } from "../../../../../api/organizations/org.api";

const handlers: Handler[] = [
    {
        apiRoute: {
            service:           "organizations",
            name:              "createOrganization",
            handler:           createOrganizationImpl0,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: [],
    },
    {
        apiRoute: {
            service:           "organizations",
            name:              "getOrganization",
            handler:           getOrganizationImpl1,
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

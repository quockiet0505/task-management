import { registerHandlers, run, type Handler } from "encore.dev/internal/codegen/appinit";
import { Worker, isMainThread } from "node:worker_threads";
import { fileURLToPath } from "node:url";
import { availableParallelism } from "node:os";

import { listMembers as listMembersImpl0 } from "../../../../../api/members/member.api";
import { createMember as createMemberImpl1 } from "../../../../../api/members/member.api";
import { updateMember as updateMemberImpl2 } from "../../../../../api/members/member.api";
import { deleteMember as deleteMemberImpl3 } from "../../../../../api/members/member.api";

const handlers: Handler[] = [
    {
        apiRoute: {
            service:           "members",
            name:              "listMembers",
            handler:           listMembersImpl0,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: [],
    },
    {
        apiRoute: {
            service:           "members",
            name:              "createMember",
            handler:           createMemberImpl1,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: [],
    },
    {
        apiRoute: {
            service:           "members",
            name:              "updateMember",
            handler:           updateMemberImpl2,
            raw:               false,
            streamingRequest:  false,
            streamingResponse: false,
        },
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
        middlewares: [],
    },
    {
        apiRoute: {
            service:           "members",
            name:              "deleteMember",
            handler:           deleteMemberImpl3,
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

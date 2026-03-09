import { apiCall, streamIn, streamOut, streamInOut } from "encore.dev/internal/codegen/api";
import { registerTestHandler } from "encore.dev/internal/codegen/appinit";


export async function listMembers(params, opts) {
    const handler = (await import("../../../../app\\api\\members\\member.api")).listMembers;
    registerTestHandler({
        apiRoute: { service: "members", name: "listMembers", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: [],
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("members", "listMembers", params, opts);
}

export async function createMember(params, opts) {
    const handler = (await import("../../../../app\\api\\members\\member.api")).createMember;
    registerTestHandler({
        apiRoute: { service: "members", name: "createMember", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: [],
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("members", "createMember", params, opts);
}

export async function updateMember(params, opts) {
    const handler = (await import("../../../../app\\api\\members\\member.api")).updateMember;
    registerTestHandler({
        apiRoute: { service: "members", name: "updateMember", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: [],
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("members", "updateMember", params, opts);
}

export async function deleteMember(params, opts) {
    const handler = (await import("../../../../app\\api\\members\\member.api")).deleteMember;
    registerTestHandler({
        apiRoute: { service: "members", name: "deleteMember", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: [],
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("members", "deleteMember", params, opts);
}


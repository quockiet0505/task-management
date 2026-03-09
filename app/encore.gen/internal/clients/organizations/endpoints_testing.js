import { apiCall, streamIn, streamOut, streamInOut } from "encore.dev/internal/codegen/api";
import { registerTestHandler } from "encore.dev/internal/codegen/appinit";


export async function createOrganization(params, opts) {
    const handler = (await import("../../../../app\\api\\organizations\\org.api")).createOrganization;
    registerTestHandler({
        apiRoute: { service: "organizations", name: "createOrganization", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: [],
        endpointOptions: {"expose":false,"auth":true,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("organizations", "createOrganization", params, opts);
}

export async function getOrganization(params, opts) {
    const handler = (await import("../../../../app\\api\\organizations\\org.api")).getOrganization;
    registerTestHandler({
        apiRoute: { service: "organizations", name: "getOrganization", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: [],
        endpointOptions: {"expose":false,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("organizations", "getOrganization", params, opts);
}


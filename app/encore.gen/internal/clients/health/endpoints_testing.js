import { apiCall, streamIn, streamOut, streamInOut } from "encore.dev/internal/codegen/api";
import { registerTestHandler } from "encore.dev/internal/codegen/appinit";


export async function health(params, opts) {
    const handler = (await import("../../../../app\\api\\health\\health.api")).health;
    registerTestHandler({
        apiRoute: { service: "health", name: "health", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: [],
        endpointOptions: {"expose":false,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("health", "health", params, opts);
}


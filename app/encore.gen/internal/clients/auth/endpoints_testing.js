import { apiCall, streamIn, streamOut, streamInOut } from "encore.dev/internal/codegen/api";
import { registerTestHandler } from "encore.dev/internal/codegen/appinit";


export async function register(params, opts) {
    const handler = (await import("../../../../app\\api\\auth\\auth.api")).register;
    registerTestHandler({
        apiRoute: { service: "auth", name: "register", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: [],
        endpointOptions: {"expose":false,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("auth", "register", params, opts);
}

export async function login(params, opts) {
    const handler = (await import("../../../../app\\api\\auth\\auth.api")).login;
    registerTestHandler({
        apiRoute: { service: "auth", name: "login", raw: false, handler, streamingRequest: false, streamingResponse: false },
        middlewares: [],
        endpointOptions: {"expose":false,"auth":false,"isRaw":false,"isStream":false,"tags":[]},
    });

    return apiCall("auth", "login", params, opts);
}


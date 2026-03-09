import { api } from "encore.dev/api";

export interface HealthResponse {
  status: string;
}

export const health = api(
  { method: "GET", path: "/health", expose: true },
  async (): Promise<HealthResponse> => {
    return { status: "ok" };
  }
);
import { api } from "encore.dev/api"

export const health = api(
  { method: "GET", path: "/" },
  async () => {
    return {
      status: "ok",
      service: "task-management",
    }
  }
)

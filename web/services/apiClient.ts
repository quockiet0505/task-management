const API_BASE = process.env.NEXT_PUBLIC_API_URL || ""

export async function apiClient<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    credentials: "include", 
  })

  if (!res.ok) {
    throw new Error(`Server error (${res.status})`)
  }

  const text = await res.text()
  if (!text) {
    return {} as T
  }

  try {
    const data: T = JSON.parse(text)
    return data
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("Invalid JSON response from server")
  }
}
const API_BASE = process.env.NEXT_PUBLIC_API_URL || ""

export async function apiClient<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null

  console.log("🔑 TOKEN:", token ? token.substring(0, 20) + "..." : "No token")
  console.log("📤 REQUEST:", options.method || "GET", `${API_BASE}${path}`)
  console.log("📦 BODY:", options.body)

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  console.log("📋 HEADERS:", headers)

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    credentials: "include", 
  })

  console.log("📥 RESPONSE STATUS:", res.status, res.statusText)

  if (!res.ok) {
    const errorText = await res.text()
    console.error("❌ ERROR RESPONSE:", errorText)
    throw new Error(`Server error (${res.status}): ${errorText}`)
  }

  const text = await res.text()
  console.log("📄 RAW TEXT:", text)
  
  if (!text) {
    console.log("⚠️ Empty response")
    return {} as T
  }

  try {
    const data: T = JSON.parse(text)
    console.log("✅ PARSED DATA:", data)
    return data
  } catch (error) {
    console.error("❌ JSON PARSE ERROR:", error)
    throw new Error("Invalid JSON response from server")
  }
}
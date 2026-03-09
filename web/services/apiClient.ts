const API_URL = "http://localhost:4000"

export async function apiFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${API_URL}${path}`, options)

  if (!res.ok) throw new Error(await res.text())

  return res.json()
}
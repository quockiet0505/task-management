// const API_URL = "http://localhost:4000"

// export async function apiFetch(path: string, options?: RequestInit) {
//   const res = await fetch(`${API_URL}${path}`, {
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     ...options,
//   })

//   if (!res.ok) {
//     throw new Error(await res.text())
//   }

//   return res.json()
// }

const API_URL = "http://localhost:4000"

export async function apiFetch(path: string, options?: RequestInit) {
  await new Promise(resolve => setTimeout(resolve, 500))
  console.log(`[API MOCK] Gọi tới: ${API_URL}${path}`, options)
  return { success: true }
}
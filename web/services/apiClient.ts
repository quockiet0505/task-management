/* eslint-disable @typescript-eslint/no-explicit-any */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

console.log("DEBUG: API_BASE ->", API_BASE);

export async function apiClient(
  path: string,
  options: RequestInit = {}
) {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const url = `${API_BASE}${path}`;
    console.log(`[Fetch] Calling API: ${url}`);

    const res = await fetch(url, {
      ...options,
      headers,
    });

    console.log(`[Fetch] Response Status: ${res.status}`);

    const text = await res.text();
    console.log(`[Fetch] Raw Content:`, text);

    let data = {};
    if (text) {
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error("JSON Parsing Error:", text);
        throw new Error("Received data is not a valid JSON format");
      }
    } else {
      console.warn("Backend returned an empty response body!");
    }

    if (!res.ok) {
      throw new Error((data as any)?.message || `Server Error (${res.status})`);
    }

    return data;
  } catch (error: any) {
    console.error(`[API Error] ${path}:`, error.message);
    throw error;
  }
}
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
    console.log(`[Fetch] Đang gọi API: ${url}`);

    const res = await fetch(url, {
      ...options,
      headers,
    });

    console.log(`[Fetch] Trạng thái phản hồi (Status): ${res.status}`);

    // 1. Đọc nội dung dưới dạng chuỗi chữ (Text) trước để không bị crash
    const text = await res.text();
    console.log(`[Fetch] Nội dung thô (Raw text):`, text);

    // 2. Chuyển thành JSON an toàn
    let data = {};
    if (text) {
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error("Lỗi khi parse JSON:", text);
        throw new Error("Dữ liệu trả về không phải chuẩn JSON");
      }
    } else {
      console.warn("CẢNH BÁO: Backend trả về dữ liệu trống rỗng!");
    }

    if (!res.ok) {
      throw new Error((data as any)?.message || `Lỗi máy chủ (${res.status})`);
    }

    return data;
  } catch (error: any) {
    console.error(`[API Error] ${path}:`, error.message);
    throw error;
  }
}
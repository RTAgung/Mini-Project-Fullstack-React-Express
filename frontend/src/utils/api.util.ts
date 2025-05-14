/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL_API = import.meta.env.VITE_BASE_URL_API;

export async function apiFetch<T = any>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    body?: any
): Promise<T> {
    // enkrip body before send to api
    const res = await fetch(`${BASE_URL_API}${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
        credentials: "include", // to include cookies
    });

    const json = await res.json();

    if (!res.ok) {
        throw new Error(json.message ?? "Something went wrong");
    }

    return json;
}

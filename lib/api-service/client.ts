import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

interface FetchOptions extends Omit<RequestInit, "next"> {
  auth?: boolean;
  revalidate?: number | false; // ISR revalidation in seconds, false for no-store
  tags?: string[]; // Cache tags for on-demand revalidation
}

export async function apiFetch<T>(
  endpoint: string,
  { auth = false, revalidate, tags, headers, ...options }: FetchOptions = {}
): Promise<T> {
  let token: string | null = null;

  const cookieStore = await cookies();
  token = cookieStore.get("access_token")?.value ?? null;

  // Determine caching strategy
  const cacheOptions: RequestInit = {};
  if (auth) {
    // Authenticated requests should never be cached
    cacheOptions.cache = "no-store";
  } else if (revalidate === false) {
    // Explicitly disable caching
    cacheOptions.cache = "no-store";
  } else {
    // Use ISR with revalidation (default 1 hour for public data)
    cacheOptions.next = {
      revalidate: revalidate ?? 3600,
      ...(tags ? { tags } : {}),
    };
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...cacheOptions,
  });

  // Access token expired
  if (response.status === 401 && auth) {
    const refreshed = await refreshAccessToken();

    if (!refreshed) {
      redirect("/login");
    }

    // Retry original request
    return apiFetch<T>(`${API_BASE_URL}${endpoint}`, options);
  }

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed: ${response.status}`);
  }

  return response.json();
}

async function refreshAccessToken() {
  const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  return res.ok;
}


export const queryKeys = {
  conversations: (params?: unknown) => ["conversations", params],
  conversationMessages: (id: string | null) => ["conversation-messages", id],
  overview: (params?: unknown) => ["overview", params],
};

const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

interface FetchOptions extends RequestInit {
  auth?: boolean;
}

export async function apiFetch<T>(
  endpoint: string,
  { auth = false, headers, ...options }: FetchOptions = {}
): Promise<T> {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("access_token")
      : null;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed: ${response.status}`);
  }

  return response.json();
}


export const queryKeys = {
  conversations: (params?: unknown) => ["conversations", params],
  conversationMessages: (id: string | null) => ["conversation-messages", id],
};

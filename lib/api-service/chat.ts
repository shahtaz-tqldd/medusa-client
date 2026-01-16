import { useQuery } from "@tanstack/react-query";
import { apiFetch, queryKeys } from "./client";
import { PaginatedResponse } from "./_types";


/* ------------------ TYPES ------------------ */
export interface chatUserProps {
  ip_address: string | null;
  first_visit: string;
  last_visit: string;
  device_name: string | null;
  device_type: string | null;
  latitude: number | null;
  longitude: number | null;
  country: string | null;
  city: string | null;
  visit_count: number;
  total_time_spent: string;
}
export interface Conversation {
  id: string;
  title: string | null;
  summary: string | null;
  created_at: string;
  total_message: number;
  last_message: {
    content: string;
    sender: "user" | "ai";
  } | null;
  user: chatUserProps;
}

interface ConversationMessage {
  id: string;
  sender: "user" | "ai";
  content: string;
  created_at: string;
}

interface ConversationResponse {
  success: boolean;
  data: {
    messages: ConversationMessage[];
  };
}


/* ------------------ QUERY ------------------ */

export const useConversationMessages = (conversationId: string | null) => {
  return useQuery({
    queryKey: queryKeys.conversationMessages(conversationId),
    enabled: !!conversationId,
    queryFn: async () => {
      const data = await apiFetch<ConversationResponse>(
        `chat/conversation/${conversationId}/`
      );

      if (!data.success) return [];

      return data.data.messages.map((msg) => ({
        sender: msg.sender,
        text: msg.content,
      }));
    },
  });
};


export async function fetchConversationList(page = 1, limit = 10, search = "") {
  const params = new URLSearchParams({
    offset: ((page - 1) * limit).toString(),
    ...(search ? { search } : {}),
  });
  return await apiFetch<PaginatedResponse<Conversation[]>>(
    `/chat/conversation/list/?${params.toString()}`,
    { auth: true, cache: "no-store" }
  );
}


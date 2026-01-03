import { useQuery, useMutation } from "@tanstack/react-query";
import { apiFetch, queryKeys } from "./client";


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

interface ConversationListResponse {
  count: number;
  results: Conversation[];
}

export const useConversationList = (
  page = 1,
  search = "",
  limit = 10
) => {
  return useQuery({
    queryKey: queryKeys.conversations({ page, search, limit }),
    queryFn: async () => {
      const params = new URLSearchParams({
        offset: ((page - 1) * limit).toString(),
        ...(search ? { search } : {}),
      });

      const data = await apiFetch<ConversationListResponse>(
        `chat/conversation/list/?${params.toString()}`,
        { auth: true }
      );

      return {
        convos: data.results ?? [],
        total: data.count ?? 0,
      };
    },
  });
};

interface ChatMessagePayload {
  query: string;
  visitor_id: string;
}

interface ChatResponse {
  success: boolean;
  data: {
    conversation_id: string;
    response: string;
  };
}

export const useSendChatMessage = () => {
  return useMutation({
    mutationFn: async (query: string) => {
      const visitorId = localStorage.getItem("visitor_id");
      if (!visitorId) {
        throw new Error("Visitor ID not found");
      }

      const conversationId = localStorage.getItem("conversation_id");

      let endpoint = "chat/create-message/";
      if (conversationId) {
        endpoint += `?conversation_id=${conversationId}`;
      }

      const payload: ChatMessagePayload = {
        query,
        visitor_id: visitorId,
      };

      const data = await apiFetch<ChatResponse>(endpoint, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!data.success) {
        throw new Error("Message failed");
      }

      if (data.data.conversation_id) {
        localStorage.setItem(
          "conversation_id",
          data.data.conversation_id
        );
      }

      return data.data.response;
    },
  });
};

interface ConversationMessage {
  id: string;
  sender: string;
  content: string;
  created_at: string;
}

interface ConversationResponse {
  success: boolean;
  data: {
    messages: ConversationMessage[];
    conversation: {
      conversation_id: string;
      created_at: string;
      title: string;
    };
  };
}

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

export interface ConversationListResponse {
  count: number;
  results: Conversation[];
}

export interface ConversationListOutput {
  convos: Conversation[];
  total: number;
}

export const fetchConversationMessages = async (
  conversationId: string | null
): Promise<{ sender: string; text: string }[]> => {
  try {
    if (!conversationId) {
      return [];
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/chat/conversation/${conversationId}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch conversation: ${response.status}`);
    }

    const data: ConversationResponse = await response.json();

    if (!data.success || !data.data.messages) {
      return [];
    }

    // Convert API messages to chat UI format
    const formattedMessages: { sender: string; text: string }[] = [];

    data.data.messages.forEach((msg) => {
      // Add AI response
      if (msg.sender === "ai") {
        formattedMessages.push({
          sender: "ai",
          text: msg.content,
        });
      } else {
        formattedMessages.push({
          sender: "user",
          text: msg.content,
        });
      }
    });

    return formattedMessages;
  } catch (error) {
    console.error("Failed to fetch conversation messages:", error);
    return [];
  }
};

export const fetchConversationList = async (
  page: number = 1,
  search: string = "",
  limit: number = 10
): Promise<ConversationListOutput> => {
  const authToken = localStorage.getItem("access_token");
  const params = new URLSearchParams({
    offset: ((page - 1) * limit).toString(),
  });

  if (search) {
    params.append("search", search);
  }

  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_SERVER_URL
      }/chat/conversation/list/?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch conversation: ${response.status}`);
    }

    const data: ConversationListResponse = await response.json();

    if (data?.results?.length) {
      return { convos: data?.results, total: data?.count || 0 };
    }
    return { convos: [], total: 0 };
  } catch (error) {
    console.error("Failed to fetch conversation list:", error);
    return { convos: [], total: 0 };
  }
};

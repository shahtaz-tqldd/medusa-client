// lib/chat-service.ts

interface ChatMessage {
  query: string;
  visitor_id: string;
  conversation_id?: string;
}

interface ChatResponse {
  success: boolean;
  data: {
    conversation_id: string;
    response: string;
    // Add other response fields as needed
  };
}

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

export const fetchConversationMessages = async (): Promise<
  { sender: string; text: string }[]
> => {
  try {
    const conversationId = localStorage.getItem("conversation_id");

    if (!conversationId) {
      return [];
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}chat/conversation/${conversationId}/`,
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

export const sendChatMessage = async (query: string): Promise<string> => {
  try {
    const visitorId = localStorage.getItem("visitor_id");

    if (!visitorId) {
      throw new Error("Visitor ID not found. Please refresh the page.");
    }

    const conversationId = localStorage.getItem("conversation_id");

    // Build the API URL
    let apiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}chat/create-message/`;
    if (conversationId) {
      apiUrl += `?conversation_id=${conversationId}`;
    }

    // Build the payload
    const payload: ChatMessage = {
      query,
      visitor_id: visitorId,
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data: ChatResponse = await response.json();

    if (!data.success) {
      throw new Error("Failed to send message");
    }

    // Store conversation_id for subsequent messages
    if (data.data.conversation_id) {
      localStorage.setItem("conversation_id", data.data.conversation_id);
    }

    return data.data.response || "I received your message!";
  } catch (error) {
    console.error("Chat message failed:", error);
    throw error;
  }
};

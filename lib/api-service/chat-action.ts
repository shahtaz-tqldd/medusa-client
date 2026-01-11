"use server";

import { DataResponse } from "./_types";

const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

interface ChatMessagePayload {
  query: string;
  visitor_id: string;
}

export interface ChatResponse {
  conversation_id: string | null;
  response: string;

}

export async function sendMessage(payload: ChatMessagePayload, conversationId: string | null = null) {

  let endpoint = `${API_BASE_URL}/chat/create-message/`;
  if (conversationId) {
    endpoint += `?conversation_id=${conversationId}`;
  }

  const res = await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-type": "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  const data: DataResponse<ChatResponse> = await res.json();

  if (!data.success) {
    return { response: data.message, conversation_id: null }
  }

  return data.data
}

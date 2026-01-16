"use client";

import React, { useState } from "react";
import ChatList from "./chat-list";
import ChatDetails from "./chat-details";
import { Conversation } from "@/lib/api-service/chat";
import { useRouter, useSearchParams } from "next/navigation";

const ChatPage = ({
  conversationList,
  total_count,
  page,
}: {
  conversationList: Conversation[];
  total_count: number;
  page: number;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updatePagination = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-1 rounded-2xl overflow-hidden border-2 dark:border-white/10 border-blue-500/10">
        <ChatList
          className="w-[400px] border-r dark:border-r-white/10 border-r-blue-500/15"
          conversations={conversationList}
          onSelect={(conversation) => {
            setSelectedConversation(conversation);
          }}
          page={page}
          setPage={(p) => updatePagination(p)}
          total={total_count}
          selected_id={selectedConversation?.id || null}
        />
        <ChatDetails conversation={selectedConversation} />
      </div>
    </div>
  );
};

export default ChatPage;

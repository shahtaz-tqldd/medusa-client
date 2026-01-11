"use client";

import React, { useState } from "react";
import ChatList from "./chat-list";
import ChatDetails from "./chat-details";
import { Conversation } from "@/lib/api-service/chat";

const ChatPage = ({
  conversationList,
  total_count,
}: {
  conversationList: Conversation[];
  total_count: number;
}) => {
  const [page, setPage] = useState<number>(1);

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
          setPage={setPage}
          total={total_count}
        />
        <ChatDetails className="" conversation={selectedConversation} />
      </div>
    </div>
  );
};

export default ChatPage;

"use client";

import React, { useEffect, useState } from "react";
import ChatList from "./chat-list";
import ChatDetails from "./chat-details";
import { Conversation, fetchConversationList } from "@/lib/chat-service";

const ChatPage = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadConversations = async () => {
      setIsLoading(true);
      const { convos, total } = await fetchConversationList(page, search);
      setConversations(convos);
      setTotal(total);
      setIsLoading(false);
    };

    loadConversations();
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-1 rounded-2xl overflow-hidden border-2 dark:border-white/10 border-blue-500/10">
        <ChatList
          className="w-[400px] border-r dark:border-r-white/10 border-r-blue-500/15"
          conversations={conversations}
          isLoading={isLoading}
          onSelect={(conversation) => {
            setSelectedConversation(conversation);
          }}
          page={page}
          setPage={setPage}
          total={total}
        />
        <ChatDetails className="" conversation={selectedConversation} />
      </div>
    </div>
  );
};

export default ChatPage;

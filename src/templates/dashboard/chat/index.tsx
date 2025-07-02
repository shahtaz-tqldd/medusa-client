import React from "react";
import PageTitle from "@/components/reusable/page-title";
import ChatList from "./chat-list/chat-list";
import ChatDetails from "./chat-details/chat-details";

const ChatPage = () => {
  return (
    <div className="h-full flex flex-col">
        <PageTitle>Chat</PageTitle>
        <div className="mt-8 flex flex-1 rounded-2xl overflow-hidden border-2 border-white/10">
            <ChatList className="w-[360px] border-r border-r-white/10"/>
            <ChatDetails className=""/>
        </div>
    </div>
  );
};

export default ChatPage;

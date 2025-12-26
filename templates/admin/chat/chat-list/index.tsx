import React from "react";

import Pagination from "@/components/tables/pagination";
import { Conversation } from "@/lib/chat-service";
import { formatTimeFromNow } from "@/lib/date";
import { Card } from "@/components/ui/card";
import { Text, Title } from "@/components/ui/typography";
import { FolderOpen } from "lucide-react";

interface ChatListProps {
  className?: string;
  conversations: Conversation[];
  isLoading: boolean;
  page: number;
  total: number;
  setPage: (page: number) => void;
  onSelect: (conversation: Conversation) => void;
}

const ChatList = ({
  className,
  conversations,
  isLoading,
  page,
  total,
  setPage,
  onSelect,
}: ChatListProps) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="dark:bg-blue-200/5 bg-blue-500/10 p-4">
        <Title variant="xs" className="font-semibold">
          Chatbot Messages
        </Title>
      </div>

      <div className="flex-1 medusa-scroll p-2 space-y-2 center">
        {isLoading ? (
          <Text variant="sm">Loading conversations...</Text>
        ) : conversations.length === 0 ? (
          <div className="flex flex-col items-center gap-2">
            <FolderOpen size={32} strokeWidth="1" className="text-300/80" />
            <Text variant="sm">No conversations found</Text>
          </div>
        ) : (
          conversations?.map((conversation) => (
            <Card
              key={conversation.id}
              className="p-3 md:p-3 lg:p-3 rounded-xl cursor-pointer hover:bg-white/10 transition"
              onClick={() => onSelect(conversation)}
            >
              <h2 className="text-sm font-medium truncate">
                {conversation.title || "Untitled conversation"}
              </h2>

              {conversation.last_message?.content && (
                <Text className="mt-1 text-[13px] line-clamp-2">
                  {conversation.last_message.content}
                </Text>
              )}
              <div className="mt-4 text-xs opacity-60 gap-2">
                <p>{formatTimeFromNow(conversation.created_at)}</p>
              </div>
            </Card>
          ))
        )}
      </div>
      <Pagination page={page} setPage={setPage} totalCount={total} />
    </div>
  );
};

export default ChatList;

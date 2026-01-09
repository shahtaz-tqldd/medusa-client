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
  page: number;
  total: number;
  setPage: (page: number) => void;
  onSelect: (conversation: Conversation) => void;
}

const ChatList = ({
  className,
  conversations,
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

      <div className="flex-1 medusa-scroll p-2 space-y-2">
        {total == 0 ? (
          <div className="flex flex-col items-center gap-2">
            <FolderOpen size={32} strokeWidth="1" className="text-300/80" />
            <Text variant="sm">No conversations found</Text>
          </div>
        ) : (
          conversations?.map((conversation) => (
            <Card
              key={conversation.id}
              onClick={() => onSelect(conversation)}
              className="!py-3 !px-4 cursor-pointer border border-transparent hover:border-blue-500 tr"
            >
              <div>
                <Title
                  variant="xs"
                  className="truncate !text-base font-semibold"
                >
                  {conversation.title || "Untitled conversation"}
                </Title>

                {conversation.last_message?.content && (
                  <Text variant="xs" className="mt-1 line-clamp-1">
                    {conversation.last_message.content}
                  </Text>
                )}
                <div className="mt-2 text-xs opacity-60 gap-2">
                  <p>{formatTimeFromNow(conversation.created_at)}</p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
      <Pagination page={page} setPage={setPage} total={total} />
    </div>
  );
};

export default ChatList;

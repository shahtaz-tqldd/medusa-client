import React from "react";

import Pagination from "@/components/tables/pagination";
import { Conversation } from "@/lib/chat-service";
import { formatTimeFromNow } from "@/lib/date";
import { Card } from "@/components/ui/card";
import { Text, Title } from "@/components/ui/typography";
import { FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { getFlag } from "@/lib/country";

interface ChatListProps {
  className?: string;
  conversations: Conversation[];
  page: number;
  total: number;
  setPage: (page: number) => void;
  onSelect: (conversation: Conversation) => void;
  selected_id: string | null;
}

const ChatList = ({
  className,
  conversations,
  page,
  total,
  setPage,
  onSelect,
  selected_id,
}: ChatListProps) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="dark:bg-lime-200/5 bg-emerald-500/10 p-4">
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
              className={cn(
                "!py-3 !px-4 cursor-pointer border tr",
                conversation.id === selected_id
                  ? "dark:border-lime-400 border-emerald-600"
                  : "border-transparent hover:dark:bg-[#2e2e2e] hover:bg-emerald-500/5"
              )}
            >
              <div className="flx gap-2">
                {getFlag(conversation.user.country || "default")}
                <Title
                  variant="xs"
                  className="truncate !text-base font-semibold"
                >
                  {conversation.title || "Untitled conversation"}
                </Title>
              </div>

              {conversation.last_message?.content && (
                <Text variant="xs" className="mt-1 line-clamp-1">
                  {conversation.last_message.content}
                </Text>
              )}
              <div className="mt-2 text-xs opacity-60 gap-2">
                <p>{formatTimeFromNow(conversation.created_at)}</p>
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

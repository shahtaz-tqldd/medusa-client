import PrimaryCard from "@/components/cards/primary-card";
import Pagination from "@/components/reusable/pagination";
import BodyText from "@/components/text/body-text";
import { Conversation } from "@/lib/chat-service";
import { formatTimeFromNow } from "@/lib/date";
import React from "react";

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
      <div className="dark:bg-white/5 bg-blue-500/10 p-3">
        <h2 className="font-medium text-base">Chat List</h2>
      </div>

      <div className="flex-1 medusa-scroll p-2 space-y-2">
        {isLoading ? (
          <p className="text-sm text-white/50">Loading conversations...</p>
        ) : conversations.length === 0 ? (
          <p className="text-sm text-white/50">No conversations found.</p>
        ) : (
          conversations?.map((conversation) => (
            <PrimaryCard
              key={conversation.id}
              className="p-3 md:p-3 lg:p-3 rounded-xl cursor-pointer hover:bg-white/10 transition"
              onClick={() => onSelect(conversation)}
            >
              <h2 className="text-sm font-medium truncate">
                {conversation.title || "Untitled conversation"}
              </h2>

              {conversation.last_message?.content && (
                <BodyText className="mt-1 text-[13px] line-clamp-2">
                  {conversation.last_message.content}
                </BodyText>
              )}
              <div className="mt-4 text-xs opacity-60 gap-2">
                <p>{formatTimeFromNow(conversation.created_at)}</p>
              </div>
            </PrimaryCard>
          ))
        )}
      </div>
      <Pagination page={page} setPage={setPage} totalCount={total} />
    </div>
  );
};

export default ChatList;

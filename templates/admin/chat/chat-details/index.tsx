"use client";

import React, { useEffect, useRef, useState } from "react";

import IconButton from "@/components/ui/icon-button";
import {
  ChevronDown,
  GanttChart,
  Laptop,
  MapPin,
  MessageSquareDot,
} from "lucide-react";
import {
  chatUserProps,
  Conversation,
  fetchConversationMessages,
} from "@/lib/chat-service";
import { formatTimeFromNow } from "@/lib/date";
import { Text } from "@/components/ui/typography";

interface MessageProps {
  sender: string;
  text: string;
}

interface ChatDetailsProps {
  className: string;
  conversation: Conversation | null;
}

const ChatDetails = ({ className, conversation }: ChatDetailsProps) => {
  const [messages, setMessages] = useState<MessageProps[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (conversation?.id) {
      const loadConversationMessages = async () => {
        setIsLoading(true);
        try {
          const existingMessages = await fetchConversationMessages(
            conversation?.id
          );
          if (existingMessages.length > 0) {
            setMessages(existingMessages);
          }
        } catch (error) {
          console.error("Failed to load conversation:", error);
        } finally {
          setIsLoading(false);
        }
      };
      loadConversationMessages();
    }
  }, [conversation]);

  const hasMessages = messages?.length > 0;

  return (
    <div className={`flex w-full ${className}`}>
      <div className="flex-1">
        <ChatWindow messages={messages} isLoading={isLoading} />
      </div>
      {hasMessages && <UserDetails user={conversation?.user} />}
    </div>
  );
};

export default ChatDetails;

interface ChatWindowProps {
  messages: MessageProps[];
  isLoading: boolean;
}

const ChatWindow = ({ messages, isLoading }: ChatWindowProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const hasMessages = messages.length > 0 || isLoading;

  return (
    <div
      ref={containerRef}
      className="overflow-y-auto h-full p-5 flex flex-col"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {hasMessages ? (
        <div className="flex flex-col gap-2">
          {isLoading && messages.length === 0 && (
            <div className="center text-sm text-gray-500 dark:text-gray-400">
              Loading conversation...
            </div>
          )}

          {messages.map((item, index) => (
            <div
              key={index}
              className={`flex ${
                item.sender === "ai" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="max-w-[75%] flex flex-col gap-2">
                <div
                  className={`p-4 rounded-xl text-sm whitespace-pre-line ${
                    item.sender === "ai"
                      ? "bg-emerald-600 text-white rounded-br-none"
                      : "bg-blue-500/10 dark:bg-white/10 text-black dark:text-white"
                  }`}
                >
                  {item.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="center h-full flex-col">
          <MessageSquareDot size={40} strokeWidth="1" />
          <Text variant="sm" className="max-w-xs text-center mt-6">
            Select a message to view the full conversation
          </Text>
        </div>
      )}
    </div>
  );
};

interface UserDetailsProps {
  user: chatUserProps | undefined;
}

const UserDetails = ({ user }: UserDetailsProps) => {
  if (!user) return null;
  const {
    visit_count,
    longitude,
    latitude,
    country,
    city,
    device_type,
    device_name,
    last_visit,
    first_visit,
    ip_address,
  } = user;
  return (
    <div className="m-4 w-[300px] rounded-xl dark:bg-white/5 bg-white p-5 border dark:border-white/10 border-blue-500/10 space-y-4 text-sm">
      <div className="flbx">
        <h2 className="font-medium text-base">Visitor Info</h2>
        <div className="flx gap-3">
          <span className="text-sm dark:text-lime-400 text-emerald-600">Chat Summary</span>
          <IconButton icon={ChevronDown} />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flbx ">
          <span className="opacity-60">IP Address</span>
          <span className="font-medium ">{ip_address}</span>
        </div>
        <div className="flbx ">
          <span className="opacity-60">First Visit</span>
          <span className="font-medium ">{formatTimeFromNow(first_visit)}</span>
        </div>
        <div className="flbx ">
          <span className="opacity-60">Last Visit</span>
          <span className="font-medium ">{formatTimeFromNow(last_visit)}</span>
        </div>
      </div>

      <div className="border-t border-white/10 pt-4 space-y-2">
        <h3 className=" font-medium flx gap-2">
          <Laptop size={16} /> Device
        </h3>
        <div className="flbx ">
          <span className="opacity-60">Name</span>
          <span className="font-medium ">{device_name}</span>
        </div>
        <div className="flbx ">
          <span className="opacity-60">Type</span>
          <span className="font-medium ">{device_type}</span>
        </div>
      </div>

      <div className="border-t border-white/10 pt-4 space-y-2">
        <h3 className=" font-medium flx gap-2">
          <MapPin size={16} /> Location
        </h3>
        <div className="flbx ">
          <span className="opacity-60">City</span>
          <span className="font-medium ">{city}</span>
        </div>
        <div className="flbx ">
          <span className="opacity-60">Country</span>
          <span className="font-medium ">{country}</span>
        </div>
        <div className="flbx ">
          <span className="opacity-60">Lat / Long</span>
          <span className="font-medium ">
            {Number(latitude || 0)?.toFixed(2)},{" "}
            {Number(longitude || 0)?.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="border-t border-white/10 pt-4 space-y-2">
        <h3 className=" font-medium flx gap-2">
          <GanttChart size={16} /> Analytics
        </h3>
        <div className="flbx ">
          <span className="opacity-60">Visits</span>
          <span className="font-medium ">{visit_count}</span>
        </div>
        <div className="flbx ">
          <span className="opacity-60">Total Time</span>
          <span className="opacity-40">Not Found</span>
        </div>
      </div>
    </div>
  );
};

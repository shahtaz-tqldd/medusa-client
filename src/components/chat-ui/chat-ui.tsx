"use client"

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

// components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChatHeader, ChatInputBox, InitialUI } from "./initial-ui";
import Button from "../buttons/primary-button";

// icons
import LordIcon from "@/assets/icons/lord-icon";

interface MessageItem {
  sender: string;
  text: string;
}

const ChatUi: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { theme } = useTheme();
  const [messages, setMessages] = useState<MessageItem[]>([]);

  useEffect(() => {
    if (messages?.length > 0 && messages?.length % 2 === 0) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Hey Nice to meet you! I am Era, Shahtaz's AI assistance. How may I help you?",
        },
      ]);
    }
  }, [messages]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="fixed bottom-8 right-5 md:right-0 md:left-[88vw] z-[1000]">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger>
          <Button variant="rubix" role="presentation" size="md" className={`px-3 md:px-5 ${isOpen ? "opacity-0" : "opacity-100"}`}>
            <LordIcon
              icon="bpptgtfr"
              height={22}
              width={22}
              primary={theme === "dark" ? "#222" : "#fff"}
              target="button"
            />
            <span className="hidden md:block">Let's talk</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="dark:bg-[#121212]/80 bg-gray-50 backdrop-blur-2xl max-h-screen md:max-h-[620px] h-screen md:h-[620px] w-screen md:w-[400px] mr-0 md:mr-10 -mb-[84px] md:-mb-14 border-0 md:border dark:border-white/20 border-blue-600/10 rounded-none md:rounded-2xl px-5 py-4 flex flex-col">
          <ChatHeader setIsOpen={setIsOpen} />
          <div
            className="h-full flex-1 overflow-y-auto pr-1 my-3 flex flex-col"
            style={{
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE/Edge
            }}
            ref={scrollContainerRef}
          >
            {messages?.length > 0 ? (
              <>
                <div className="flex-1 min-h-0"></div>
                <div className="flex flex-col gap-2">
                  {messages.map(
                    (item: { sender: string; text: string }, index: number) => (
                      <div
                        key={index}
                        className={`flex ${
                          item.sender === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[75%] px-4 py-2 rounded-xl text-sm whitespace-pre-line ${
                            item.sender === "user"
                              ? "bg-[#2b7fff] text-white rounded-br-none"
                              : "bg-blue-500/10 dark:bg-white/10 text-black dark:text-white"
                          }`}
                        >
                          {item.text}
                        </div>
                      </div>
                    )
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </>
            ) : (
              <InitialUI />
            )}
          </div>

          <ChatInputBox
            message={message}
            setMessage={setMessage}
            setMessages={setMessages}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ChatUi;
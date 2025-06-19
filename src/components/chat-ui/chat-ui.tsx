"use client";

import React, { useEffect, useRef, useState } from "react";

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
import { useTheme } from "next-themes";
import { CircleUser, User2 } from "lucide-react";

interface messageItem {
  sender: string;
  text: string;
}

const ChatUi: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { theme } = useTheme();
  const [messages, setMessages] = useState<messageItem[]>([]);

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
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <div className="fixed bottom-8 left-[88vw]">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger>
          <Button variant="rubix" role="presentation" size="md" className={isOpen? "opacity-0":"opacity-100"}>
            <LordIcon
              icon="bpptgtfr"
              height={22}
              width={22}
              primary={theme === "dark" ? "#222" : "#fff"}
              target="button"
            />
            Let's talk
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="dark:bg-[#121212]/50 bg-violet-600/5 backdrop-blur-2xl h-[620px] w-[400px] mr-10 -mb-14 border dark:border-white/20 border-emerald-600/10 rounded-2xl px-5 py-4 flex flex-col">
          <ChatHeader setIsOpen={setIsOpen} />
          <div
            className="h-full flex-1 overflow-y-auto space-y-2 pr-1 my-3"
            style={{
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE/Edge
            }}
            ref={scrollContainerRef}
          >
            {messages?.length > 0 ? (
              <div className="flex flex-col gap-2 justify-end">
                <>
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
                              ? "bg-emerald-500 text-white rounded-br-none"
                              : "bg-white/30 dark:bg-white/10 text-black dark:text-white rounded-bl-none"
                          }`}
                        >
                          {item.text}
                        </div>
                        {/* <div className="bg-emerald-500 center rounded-full h-8 w-8">
                        <CircleUser size={16} className="text-white" strokeWidth={1.5} />
                      </div> */}
                      </div>
                    )
                  )}
                </>
                <div ref={messagesEndRef} />
              </div>
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

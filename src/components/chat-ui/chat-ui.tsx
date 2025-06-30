"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { sendChatMessage, fetchConversationMessages } from "@/lib/chat-service";

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
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingConversation, setIsLoadingConversation] = useState(false);

  // Load existing conversation messages when component mounts
  useEffect(() => {
    const loadConversationMessages = async () => {
      setIsLoadingConversation(true);
      try {
        const existingMessages = await fetchConversationMessages();
        console.log(existingMessages)
        if (existingMessages.length > 0) {
          setMessages(existingMessages);
        }
      } catch (error) {
        console.error("Failed to load conversation:", error);
      } finally {
        setIsLoadingConversation(false);
      }
    };

    loadConversationMessages();
  }, []);

  // Handle viewport height changes for mobile keyboard
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (userMessage: string) => {
    if (!userMessage.trim() || isLoading) return;

    // Add user message immediately
    setMessages(prev => [...prev, { sender: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const aiResponse = await sendChatMessage(userMessage);
      
      // Add AI response
      setMessages(prev => [...prev, { sender: "ai", text: aiResponse }]);
    } catch (error) {
      console.error("Failed to send message:", error);
      
      // Add error message
      setMessages(prev => [...prev, { 
        sender: "ai", 
        text: "Sorry, I'm having trouble responding right now. Please try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

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

        <DropdownMenuContent 
          className={`
            dark:bg-[#121212]/80 bg-gray-50 backdrop-blur-2xl 
            max-h-screen md:max-h-[620px] h-screen md:h-[620px] w-screen md:w-[400px] 
            mr-0 md:mr-10 -mb-[84px] md:-mb-14 
            border-0 md:border dark:border-white/20 border-blue-600/10 
            rounded-none md:rounded-2xl px-5 py-4 flex flex-col
          `}
        >
          {/* Mobile-specific sticky header */}
          <div className="md:hidden sticky top-0 bg-gray-50 dark:bg-[#121212]/80 backdrop-blur-2xl z-10 -mx-5 px-5 py-4 border-b border-black/10 dark:border-white/10">
            <ChatHeader setIsOpen={setIsOpen} />
          </div>
          
          {/* Desktop header */}
          <div className="hidden md:block">
            <ChatHeader setIsOpen={setIsOpen} />
          </div>
          
          <div
            className={`flex-1 overflow-y-auto pr-1 flex flex-col my-3 md:my-3`}
            style={{
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE/Edge
            }}
            ref={scrollContainerRef}
          >
            {messages?.length > 0 || isLoadingConversation ? (
              <>
                <div className="flex-1 min-h-0"></div>
                <div className="flex flex-col gap-2">
                  {/* Loading conversation indicator */}
                  {isLoadingConversation && messages.length === 0 && (
                    <div className="flex justify-center">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Loading conversation...
                      </div>
                    </div>
                  )}
                  
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
                  
                  {/* Loading indicator */}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-blue-500/10 dark:bg-white/10 px-4 py-2 rounded-xl text-sm">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </>
            ) : (
              <InitialUI />
            )}
          </div>

          {/* Mobile-specific sticky input */}
          <div className="md:hidden sticky bottom-0 bg-gray-50 dark:bg-[#121212]/80 backdrop-blur-2xl -mx-5 px-5 py-4 border-t border-black/10 dark:border-white/10">
            <ChatInputBox
              message={message}
              setMessage={setMessage}
              onSendMessage={handleSendMessage}
              isLoading={isLoading || isLoadingConversation}
            />
          </div>
          
          {/* Desktop input */}
          <div className="hidden md:block">
            <ChatInputBox
              message={message}
              setMessage={setMessage}
              onSendMessage={handleSendMessage}
              isLoading={isLoading || isLoadingConversation}
            />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ChatUi;
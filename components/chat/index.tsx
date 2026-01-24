"use client";

import React, { useEffect, useRef, useState } from "react";
import { fetchConversationMessages } from "@/lib/chat-service";

// components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChatHeader, ChatInputBox } from "./init-page";

// icons
import { Calendar, MessageSquareDot } from "lucide-react";
import { ChatResponse, sendMessage } from "@/lib/api-service/chat-action";
import { VisitorStorage } from "@/lib/visitor";

interface MessageItem {
  sender: string;
  text: string;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      sender: "ai",
      text: "Hey I’m Era, an AI Chatbot Assistant for Shahtaz's personal portfolio. How could I help you?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingConversation, setIsLoadingConversation] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  // Load existing conversation messages when component mounts
  useEffect(() => {
    const loadConversationMessages = async () => {
      setIsLoadingConversation(true);
      try {
        const conversationId = localStorage.getItem("conversation_id");
        const existingMessages =
          await fetchConversationMessages(conversationId);

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

  // Enhanced viewport height and keyboard handling for mobile
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    let initialViewportHeight = window.innerHeight;

    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);

      // Detect keyboard on mobile
      const currentHeight = window.innerHeight;
      const heightDifference = initialViewportHeight - currentHeight;

      // If height difference is significant (> 150px), assume keyboard is open
      if (heightDifference > 150) {
        setKeyboardHeight(heightDifference);
      } else {
        setKeyboardHeight(0);
      }
    };

    // Set initial values
    setVH();

    // Add event listeners
    window.addEventListener("resize", setVH);
    window.addEventListener("orientationchange", () => {
      setTimeout(() => {
        initialViewportHeight = window.innerHeight;
        setVH();
      }, 500);
    });

    // Visual viewport API for better keyboard detection (if supported)
    if (window.visualViewport) {
      const handleViewportChange = () => {
        const heightDiff = window.visualViewport
          ? window.innerHeight - window.visualViewport.height
          : 0;

        setKeyboardHeight(heightDiff);
      };

      window.visualViewport.addEventListener("resize", handleViewportChange);

      return () => {
        window.removeEventListener("resize", setVH);
        window.removeEventListener("orientationchange", setVH);
        window.visualViewport?.removeEventListener(
          "resize",
          handleViewportChange
        );
      };
    }

    return () => {
      window.removeEventListener("resize", setVH);
      window.removeEventListener("orientationchange", setVH);
    };
  }, []);

  useEffect(() => {
    if (isOpen && messages.length > 0 && !isLoadingConversation) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [isOpen, messages.length, isLoadingConversation]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to detect and extract Calendly links
  const extractCalendlyLink = (text: string): string | null => {
    const calendlyRegex = /https?:\/\/calendly\.com\/[^\s)]+/i;
    const match = text.match(calendlyRegex);
    return match ? match[0] : null;
  };

  const handleSendMessage = async (userMessage: string) => {
    if (!userMessage.trim() || isLoading) return;

    // Add user message immediately
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setIsLoading(true);
    let visitorId = VisitorStorage.getVisitorId();
    if (!visitorId) {
      visitorId = "temp";
    }
    const conversation_id = localStorage.getItem("conversation_id") || null;
    try {
      const payload: {
        query: string;
        visitor_id: string;
      } = {
        query: userMessage,
        visitor_id: visitorId,
      };

      const res: ChatResponse = await sendMessage(payload, conversation_id);

      // Add AI response
      setMessages((prev) => [...prev, { sender: "ai", text: res.response }]);

      // set conversation id on local storage
      if (!conversation_id && res.conversation_id) {
        localStorage.setItem("conversation_id", res.conversation_id);
      }
    } catch (error) {
      console.error("Failed to send message:", error);

      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Sorry, I'm having trouble responding right now. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const historyPushed = useRef(false);

  // Handle modal open/close with browser history
  useEffect(() => {
    const handlePopState = () => {
      // Check if we're coming back from a modal state
      if (isOpen && historyPushed.current) {
        setIsOpen(false);
        historyPushed.current = false;
      }
    };

    if (isOpen && !historyPushed.current) {
      // Push a new state when modal opens
      window.history.pushState({ modal: true }, "");
      historyPushed.current = true;
    }

    // Always add the event listener when modal is open
    if (isOpen) {
      window.addEventListener("popstate", handlePopState);
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOpen, setIsOpen]);

  const handleClose = () => {
    if (historyPushed.current) {
      window.history.back();
    } else {
      setIsOpen(false);
    }
    setKeyboardHeight(0);
  };

  return (
    <div className="fixed bottom-6 md:bottom-12 translate-x-1/2 right-1/2 md:translate-x-[88%] md:right-[12%] z-[1000]">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger>
          <div
            className={`flx gap-2 backdrop-blur-lg dark:bg-white/90 bg-gray-800 text-white dark:text-gray-800 text-xs md:text-base py-2 md:py-2.5 px-3 md:px-4 rounded-full ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          >
            <MessageSquareDot className="h-3.5 md:h-4 w-3.5 md:w-4" />
            <span className="hidden md:block">Let&apos;s Chat</span>
            <span className="block md:hidden">Chat with Assitant</span>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className={`
            dark:bg-[#121212]/80 bg-gray-50 backdrop-blur-2xl 
            max-h-screen md:max-h-[620px] w-screen md:w-[400px] 
            mr-0 md:mr-10 -mb-[68px]
            border-0 md:border dark:border-white/20 border-blue-600/10 
            rounded-none md:rounded-2xl px-0 md:px-5 py-0 md:py-4 flex flex-col
          `}
          style={{
            // Dynamic height adjustment for mobile keyboard
            height:
              typeof window !== "undefined" && window.innerWidth < 768
                ? `calc(100vh - ${keyboardHeight}px)`
                : "620px",
          }}
        >
          {/* Mobile-specific sticky header */}
          <div className="md:hidden sticky top-0 bg-gray-50/95 dark:bg-[#121212]/95 backdrop-blur-xl z-20 px-5 py-4 border-b border-black/10 dark:border-white/10">
            <ChatHeader setIsOpen={handleClose} />
          </div>

          {/* Desktop header */}
          <div className="hidden md:block">
            <ChatHeader setIsOpen={handleClose} />
          </div>

          <div
            className={`flex-1 overflow-y-auto px-5 md:px-0 pr-1 flex flex-col my-3 md:my-3 min-h-0`}
            style={{
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE/Edge
            }}
            ref={scrollContainerRef}
          >
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
                (item: { sender: string; text: string }, index: number) => {
                  const calendlyLink =
                    item.sender === "ai"
                      ? extractCalendlyLink(item.text)
                      : null;

                  return (
                    <div
                      key={index}
                      className={`flex ${
                        item.sender === "user"
                          ? "justify-end mr-3 md:mr-0"
                          : "justify-start"
                      }`}
                    >
                      <div className="max-w-[75%] flex flex-col gap-2">
                        <div
                          className={`px-4 py-2 rounded-xl text-sm whitespace-pre-line ${
                            item.sender === "user"
                              ? "bg-emerald-600 text-white rounded-br-none"
                              : "bg-emerald-500/5 dark:bg-white/10 text-black dark:text-white"
                          }`}
                        >
                          {item.text}
                        </div>

                        {/* Calendly button for AI messages */}
                        {calendlyLink && (
                          <button
                            onClick={() =>
                              window.open(
                                "https://calendly.com/shahtaz67",
                                "_blank"
                              )
                            }
                            className="self-start border border-black/20 dark:border-white/30 text-black/80 dark:text-white/80 bg-transparent hover:dark:bg-white/90 hover:dark:text-black/80 hover:bg-black/80 hover:text-white pl-3 pr-4 py-2 rounded-full text-sm font-medium tr flx gap-2"
                          >
                            <Calendar size={14} />
                            Schedule Meeting
                          </button>
                        )}
                      </div>
                    </div>
                  );
                }
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
          </div>

          {/* Mobile-specific sticky input */}
          <div className="md:hidden sticky bottom-0 bg-gray-50/95 dark:bg-[#121212]/95 backdrop-blur-xl px-2 py-4 border-t border-black/10 dark:border-white/10">
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

export default ChatWidget;

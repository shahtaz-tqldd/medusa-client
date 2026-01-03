"use client";

import React, { useEffect, useRef } from "react";

// icons
import { MessageSquare, X } from "lucide-react";
import { Text, Title } from "../ui/typography";

interface ChatHeaderProps {
  setIsOpen: (isOpen: boolean) => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ setIsOpen }) => {
  return (
    <div className="flbx">
      <div className="flx gap-2">
        <MessageSquare size={20} />
        <Title variant="xs">Chatbot Assistant</Title>
      </div>
      <button onClick={() => setIsOpen(false)}>
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

interface MessageInputInterface {
  message: string;
  setMessage: (message: string) => void;
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

export const ChatInputBox: React.FC<MessageInputInterface> = ({
  message,
  setMessage,
  onSendMessage,
  isLoading = false,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Function to adjust height based on content
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = "43px";

    // Calculate new height (with a max of 120px)
    const newHeight = Math.min(120, textarea.scrollHeight);

    // Apply the new height
    textarea.style.height = `${newHeight}px`;

    // Set overflow only if content height exceeds max height
    textarea.style.overflowY = textarea.scrollHeight > 120 ? "auto" : "hidden";
  };

  // Adjust height whenever message changes
  useEffect(() => {
    adjustHeight();
  }, [message]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage(""); // clear input
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-1">
        <textarea
          ref={textareaRef}
          className={`py-2 px-3 flex-1 rounded-xl border dark:border-white/20 border-black/30 w-full bg-white/75 dark:bg-white/10 outline-none h-[43px] resize-none ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          placeholder={isLoading ? "Sending..." : "Write your message"}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          style={{ overflowY: "hidden" }}
        />
        {/* Optional: Send button */}
        <button
          onClick={!isLoading && message.trim() ? handleSendMessage : undefined}
          className={`tr h-10 w-10 center dark:bg-white/10 bg-blue-500/10 rounded-full ${
            !isLoading && message.trim()
              ? "text-blue-500 hover:text-blue-600 "
              : "opacity-30 pointer-events-none"
          }`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="translate-x-0.5"
          >
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>

      <Text className="!text-[10px] text-center mt-2">
        AI powered Chatbot Assistant
      </Text>
    </div>
  );
};

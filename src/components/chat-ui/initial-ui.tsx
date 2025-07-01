"use client";

import React, { useEffect, useRef } from "react";

// icons
import LordIcon from "@/assets/icons/lord-icon";
import { X } from "lucide-react";
import BodyText from "../text/body-text";

export const InitialUI: React.FC = () => {
  return (
    <div className="h-full center flex-col">
      <LordIcon
        icon="ggmzvoah"
        height={140}
        width={140}
        trigger="loop"
        primary="#2b7fff"
        secondary="#03A791"
      />
      <p className="mt-10 text-center opacity-80">
        Hey, I might not be online at the moment, but my AI
        assistant, ERA, is here to help. Feel free to ask anything you'd
        like to know!
      </p>
    </div>
  );
};

interface ChatHeaderProps {
  setIsOpen: (isOpen: boolean) => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ setIsOpen }) => {
  return (
    <div className="flbx">
      <h2 className="text-xl">Let's Chat</h2>
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
      <textarea
        ref={textareaRef}
        className={`py-2 pl-4 pr-6 rounded-xl border dark:border-white/20 border-black/30 w-full bg-white/75 dark:bg-white/10 outline-none h-[43px] resize-none ${
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
      {message.trim() && !isLoading && (
        <button
          onClick={handleSendMessage}
          className="absolute right-2 bottom-[17px] text-blue-500 hover:text-blue-600 tr"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      )}
    </div>
  );
};
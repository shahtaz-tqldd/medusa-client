import React, { useEffect, useRef } from "react";

// icons
import LordIcon from "@/assets/icons/lord-icon";
import { X } from "lucide-react";
import { useTheme } from "next-themes";

export const InitialUI: React.FC = () => {
  const { theme } = useTheme();
  return (
    <div className="flex-1 h-full center flex-col">
      <LordIcon
        icon="ggmzvoah"
        height={140}
        width={140}
        trigger="loop"
        primary={theme === "dark" ? "#9cf4a7" : "#F75A5A"}
        secondary={theme === "dark" ? "#30c9e8" : "#03A791"}
      />
      <p className="text-sm mt-10 opacity-80 text-center">
        Hey, I might not be online at the moment, but don’t worry — my AI
        assistant, ERA, is here to help. Feel free to ask ERA anything you'd
        like to know about me!
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
}

export const ChatInputBox: React.FC<MessageInputInterface> = ({
  message,
  setMessage,
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
  
  return (
    <div>
      <textarea
        ref={textareaRef}
        className="py-2 px-4 rounded-xl border dark:border-white/20 border-black/30 w-full bg-white/75 dark:bg-white/10 outline-none h-[43px] resize-none"
        placeholder="Write your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ overflowY: "hidden" }}
      />
    </div>
  );
};
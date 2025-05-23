"use client";

import React, { useState } from "react";

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

const ChatUi: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { theme } = useTheme();
  return (
    <div className="fixed bottom-10 right-10">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger>
          <Button variant="rubix" role="presentation" size="md">
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
          <InitialUI />
          <ChatInputBox message={message} setMessage={setMessage} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ChatUi;

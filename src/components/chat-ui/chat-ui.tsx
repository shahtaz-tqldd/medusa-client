"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MessageCircle, X } from "lucide-react";
import LordIcon from "@/assets/icons/lord-icon";

const ChatUi = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed bottom-10 right-10">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger className="py-3 px-5 text-sm flx gap-1 rounded-full bg-violet-900 dark:bg-white dark:text-violet-900 text-white">
          <MessageCircle className="h-4 w-4" />
          Let's talk
        </DropdownMenuTrigger>
        <DropdownMenuContent className="dark:bg-[#121212]/50 bg-violet-600/5 backdrop-blur-2xl h-[600px] w-[380px] mr-10 -mb-12 border dark:border-white/20 border-emerald-600/10 rounded-2xl px-5 py-4 flex flex-col">
          <div className="flex-1">
            <div className="flbx">
              <h2 className="text-xl">Let's Chat</h2>
              <button onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="center mt-24">
              <LordIcon />
            </div>
            <p className="text-sm mt-10 opacity-80 text-center">
              Hey, I might not be online at the moment, but don’t worry — my AI
              assistant, ERA, is here to help. Feel free to ask ERA anything
              you'd like to know about me!
            </p>
          </div>

          <div>
            <input
              className="py-2 px-4 rounded-full border border-white/40 w-full outline-none"
              placeholder="Write your message"
            />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ChatUi;

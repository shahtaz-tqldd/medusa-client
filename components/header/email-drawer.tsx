"use client";
import React from "react";

// components

// icons
import { Send } from "lucide-react";
import { Drawer, DrawerContent } from "../ui/drawer";
import { Text, Title } from "../ui/typography";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export interface EmailDrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const EmailDrawer: React.FC<EmailDrawerProps> = ({ isOpen, setIsOpen }) => {
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="min-w-[100%] h-full border-l-transparent backdrop-blur-3xl bg-[#ededed] dark:bg-[#171717]">
        <div className="max-w-3xl mx-auto px-4">
          <Title>Send Email</Title>
          <Text className="mt-2">
            Write me your queries and ideas you want to discuss
          </Text>

          <div className="mt-12 flex-1">
            <div className="flex flex-col h-full gap-5">
              <Input placeholder="Your Name" />
              <Input placeholder="Your Email" />
              <Textarea
                placeholder="Your Message"
                className="min-h-60 resize-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-8">
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button className="flx gap-2">
              <Send />
              Send Message
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default EmailDrawer;

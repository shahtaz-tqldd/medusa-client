import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Save, Send, X } from "lucide-react";
import Button from "../buttons/primary-button";

interface EmailDrawerComponentProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const SendEmailDrawer: React.FC<EmailDrawerComponentProps> = ({
  isOpen,
  setIsOpen,
}) => {
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="border-l-white/20">
        <DrawerHeader className="px-10">
          <div className="flbx">
            <DrawerTitle className="text-xl">Send Email</DrawerTitle>
            <DrawerClose>
              <X />
            </DrawerClose>
          </div>
          <DrawerDescription className="opacity-75">
            Write me your queries and ideas you want to discuss
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-10 mt-5 flex-1 ">
          <div className="flex flex-col h-full gap-5">
            <input
              className="py-2 px-4 rounded-xl border dark:border-white/30 border-blue-900/20 dark:bg-white/[0.03] bg-white/20 w-full"
              placeholder="Your Name"
            />
            <input
              className="py-2 px-4 rounded-xl border dark:border-white/30 border-blue-900/20 dark:bg-white/[0.03] bg-white/20 w-full"
              placeholder="Your Email"
            />
            <textarea
              className="py-2 px-4 rounded-xl border dark:border-white/30 border-blue-900/20 dark:bg-white/[0.03] bg-white/20 w-full h-full flex-1 resize-none"
              placeholder="Your Message"
            />
          </div>
        </div>
        <DrawerFooter className="grid grid-cols-2 gap-3 px-10 mt-10">
          <Button icon={Save} variant="primary" size="md" className="justify-center">
            Save Draft
          </Button>
          <Button icon={Send} variant="rubix" size="md" className="justify-center">
            Send Message
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SendEmailDrawer;

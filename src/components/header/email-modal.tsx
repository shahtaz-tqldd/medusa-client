"use client";
import React from "react";

import Button from "@/components/buttons/primary-button";
import { Input, TextArea } from "../ui/input";
import { Save, Send } from "lucide-react";
import HeroText from "../text/hero-text";
import HadronModal from "../ui/hadron-modal";
import BodyText from "../text/body-text";

export interface EmailModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const EmailModal: React.FC<EmailModalProps> = ({ isOpen, setIsOpen }) => {
  return (
    <HadronModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="max-w-3xl mx-auto pt-6 pb-12 px-4 relative">
        <HeroText>Send Email</HeroText>
        <BodyText className="mt-2">
          Write me your queries and ideas you want to discuss
        </BodyText>

        <div className="mt-12 flex-1">
          <div className="flex flex-col h-full gap-5">
            <Input placeholder="Your Name" />
            <Input placeholder="Your Email" />
            <TextArea
              placeholder="Your Message"
              className="min-h-60 resize-none"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-8">
          <Button
            icon={Save}
            variant="primary"
            size="md"
            className="justify-center"
          >
            Save Draft
          </Button>
          <Button
            icon={Send}
            variant="rubix"
            size="md"
            className="justify-center"
          >
            Send Message
          </Button>
        </div>
      </div>
    </HadronModal>
  );
};

export default EmailModal;

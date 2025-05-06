"use client";
import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/ui/modal";

import Button from "@/components/buttons/primary-button";
import { Input, TextArea } from "../ui/input";
import { Mail, Save, Send } from "lucide-react";

const EmailModal = () => {
  return (
    <Modal>
      <ModalTrigger>
        <Button icon={Mail} variant="rubix" role="presentation">
          Send Email
        </Button>
      </ModalTrigger>
      <ModalBody>
        <ModalContent className="flex flex-col">
          <div>
            <h2 className="text-xl mb-1">Send Email</h2>
            <p className="opacity-60">Write me your queries and ideas you want to discuss</p>
          </div>
          <div className="mt-5 flex-1">
            <div className="flex flex-col h-full gap-5">
              <Input placeholder="Your Name" />
              <Input placeholder="Your Email" />
              <TextArea placeholder="Your Message" className="min-h-60 resize-none" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-8">
            <Button icon={Save} variant="primary" size="md" className="justify-center">
              Save Draft
            </Button>
            <Button icon={Send} variant="rubix" size="md" className="justify-center">
              Send Message
            </Button>
          </div>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
};


export default EmailModal

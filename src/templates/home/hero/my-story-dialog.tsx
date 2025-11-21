import React from "react";

// components
import BodyText from "@/components/text/body-text";
import HeroText from "@/components/text/hero-text";
import HadronModal from "@/components/ui/hadron-modal";

// icons
import { Code, Zap } from "lucide-react";

// data
import { MY_STORY } from "./_demo_data";
import type { MyStoryDialogProps } from "./_types";

const MyStoryDialog: React.FC<MyStoryDialogProps> = ({
  isOpen,
  setIsOpen,
}) => {
  return (
    <HadronModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="relative">
        <HeroText>
          My Somewhat Simple Story of Becoming a Software Developer
        </HeroText>

        <div className="space-y-10 mt-12">
          {MY_STORY.map((item, index) => (
            <div key={index} className="space-y-6">
              <BodyText className="text-xl">{item.content}</BodyText>
            </div>
          ))}
        </div>
        <div className="absolute top-20 left-8 opacity-5">
          <Zap
            size={200}
            strokeWidth={0.5}
            className="text-yellow-400 animate-pulse"
          />
        </div>
        <div className="absolute bottom-20 right-8 opacity-5">
          <Code
            size={200}
            strokeWidth={0.5}
            className="text-blue-400 animate-pulse"
          />
        </div>
      </div>
    </HadronModal>
  );
};

export default MyStoryDialog;

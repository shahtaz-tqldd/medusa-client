import React from "react";

// components
import BodyText from "@/components/text/body-text";
import HeroText from "@/components/text/hero-text";
import HadronModal from "@/components/ui/hadron-modal";
import TitleText from "@/components/text/title-text";

// icons
import { Code, Zap } from "lucide-react";

// data
import { JOURNEY_STEPS } from "./_demo_data";
import type { DevJourneyModalProps } from "./_types";
import Image from "next/image";

const DevJourneyModal: React.FC<DevJourneyModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  return (
    <HadronModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="max-w-3xl mx-auto pt-6 pb-12 px-4 relative">
        <img src="./shanto.jpg" alt="shanto" height={400} width={400} className="h-40 w-40 object-cover rounded-3xl" />
        <HeroText>My Development Journey</HeroText>

        <div className="space-y-10 mt-12">
          {JOURNEY_STEPS.map((item, index) => (
            <div key={index} className="space-y-6">
              <TitleText icon={item.icon}>{item.title}</TitleText>
              <BodyText>{item.content}</BodyText>
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

export default DevJourneyModal;

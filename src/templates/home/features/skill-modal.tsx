import React from "react";

// components
import BodyText from "@/components/text/body-text";
import HeroText from "@/components/text/hero-text";
import HadronModal from "@/components/ui/hadron-modal";

// data
import type { SkillModalProps } from "./_types";
import TitleText from "@/components/text/title-text";

const SkillModal: React.FC<SkillModalProps> = ({ data, isOpen, setIsOpen }) => {
  if (!data?.length) {
    return null;
  }

  return (
    <HadronModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="max-w-3xl mx-auto pt-6 pb-12 px-4 relative">
        <HeroText>Skills</HeroText>
        <div className="mt-12 space-y-8">
          {data.map((item, index) => (
            <div key={index}>
              <TitleText icon={item.icon}>{item.name}</TitleText>
              <BodyText className="mt-5">{item.description}</BodyText>
            </div>
          ))}
        </div>
      </div>
    </HadronModal>
  );
};

export default SkillModal;

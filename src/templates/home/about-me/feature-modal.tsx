import React from "react";

// components
import BodyText from "@/components/text/body-text";
import HeroText from "@/components/text/hero-text";
import HadronModal from "@/components/ui/hadron-modal";

// data
import type { FeatureModalProps } from "./_types";

const FeatureModal: React.FC<FeatureModalProps> = ({
  data,
  isOpen,
  setIsOpen,
}) => {
  if (!data) {
    return null;
  }

  return (
    <HadronModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="relative">
        <HeroText className="-translate-y-5">{data.title}</HeroText>
        <div
          className="pt-2 space-y-6 text-lg text-slate-600 dark:text-gray-400 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: data.text }}
        />
      </div>
    </HadronModal>
  );
};

export default FeatureModal;

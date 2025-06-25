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
      <div className="max-w-3xl mx-auto pt-6 pb-12 px-4 relative">
        <HeroText>{data.title}</HeroText>
        <BodyText className="mt-5 text-lg">
          <div className="space-y-6" dangerouslySetInnerHTML={{ __html: data.text }} />
        </BodyText>
      </div>
    </HadronModal>
  );
};

export default FeatureModal;

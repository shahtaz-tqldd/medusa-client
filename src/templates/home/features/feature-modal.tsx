import React from "react";

// components
import BodyText from "@/components/text/body-text";
import HeroText from "@/components/text/hero-text";
import HadronModal from "@/components/ui/hadron-modal";
import LabelText from "@/components/text/label-text";

// data
import { FeatureProps } from "./types";


// icons
import { Award, Code } from "lucide-react";

interface FeatureModalProps {
  data: FeatureProps | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

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
        <BodyText className="mt-5">{data.text}</BodyText>
      </div>
    </HadronModal>
  );
};

export default FeatureModal;
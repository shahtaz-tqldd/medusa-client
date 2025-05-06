import React from "react";
import HadronModal from "@/components/modals/hadron-modal";
import { ExperienceProps } from "./types";

interface ExperienceModalProps {
  data: ExperienceProps | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ExperienceModal: React.FC<ExperienceModalProps> = ({
  data,
  isOpen,
  setIsOpen,
}) => {
    return (
      <HadronModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="max-w-3xl mx-auto pt-12 space-y-6">
          <h2 className="text-3xl">{data?.comapny}</h2>
          <h2 className="opacity-75 mt-6">{data?.description}</h2>
        </div>
      </HadronModal>
    );
};

export default ExperienceModal;

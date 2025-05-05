import React from "react";
import HadronModal from "@/components/modals/hadron-modal";

interface DevJourneyModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const DevJourneyModal: React.FC<DevJourneyModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  return (
    <HadronModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="max-w-3xl mx-auto pt-12 space-y-6">
        <h2 className="text-3xl">My Development Journey</h2>
        <p className="opacity-75 leading-relaxed">
          It all started with a blinking cursor. A blank terminal, a simple
          `hello world`, and a desire to create something meaningful. Days
          turned into nights as bugs became puzzles, and every solved issue lit
          a spark of confidence.
        </p>
        <p className="opacity-75 leading-relaxed">
          From struggling with layout shifts to mastering component lifecycles,
          the path was filled with both frustration and joy. Each line of code
          wasn’t just logic—it was a milestone.
        </p>
        <p className="opacity-75 leading-relaxed">
          And though the journey never truly ends, we look back and realize:
          we’re no longer just writing code. We’re crafting experiences.
        </p>
      </div>
    </HadronModal>
  );
};

export default DevJourneyModal;

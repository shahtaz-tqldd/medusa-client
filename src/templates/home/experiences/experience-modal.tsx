import React from "react";

// components
import BodyText from "@/components/text/body-text";
import HeroText from "@/components/text/hero-text";
import HadronModal from "@/components/ui/hadron-modal";
import LabelText from "@/components/text/label-text";

// data
import { ExperienceProps } from "./constants";

// icons
import { Award, Code } from "lucide-react";

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
  if (!data) {
    return null;
  }

  return (
    <HadronModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="max-w-3xl mx-auto pt-6 pb-12 px-4 relative">
        <HeroText>{data.position}</HeroText>
        <p className={`text-lg mt-3 ${data.companyColor}`}>{data.company}</p>

        <div className="space-y-8 mt-6">
          <BodyText>{data.description}</BodyText>

          <div>
            <LabelText icon={Award}>Key Achievements:</LabelText>
            <ul className="mt-4 list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
              {data.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>

          <div>
             <LabelText icon={Code}>Technologies:</LabelText>
            <div className="mt-4 flex flex-wrap gap-2">
              {data.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </HadronModal>
  );
};

export default ExperienceModal;
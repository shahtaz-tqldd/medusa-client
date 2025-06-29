import React from "react";

// components
import BodyText from "@/components/text/body-text";
import HeroText from "@/components/text/hero-text";
import HadronModal from "@/components/ui/hadron-modal";
import LabelText from "@/components/text/label-text";

// data

// icons
import { Award, Code } from "lucide-react";
import type { ExperienceModalProps } from "./_types";

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
      <div className="relative">
        <HeroText className="-translate-y-5">{data.position}</HeroText>
        <p className={`text-lg -mt-4 ${data.companyColor}`}>{data.company}</p>

        <div className="space-y-8 mt-6">
          <div
            className="space-y-6 text-slate-600 dark:text-gray-400 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />

          <div>
            <LabelText icon={Award}>Key Achievements</LabelText>
            <ul className="mt-4 list-disc list-inside space-y-1 text-slate-600 dark:text-gray-400 leading-relaxed">
              {data.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>

          <div>
            <LabelText icon={Code}>Technologies</LabelText>
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

import React from "react";
import HadronModal from "@/components/ui/hadron-modal";
import { ExperienceProps } from "./constants";

interface ExperienceModalProps {
  data: ExperienceProps;
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
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          {data.position}
        </h3>
        <p className={`text-lg ${data.companyColor}`}>{data.company}</p>

        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">{data.description}</p>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Key Achievements:
            </h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
              {data.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Technologies:
            </h4>
            <div className="flex flex-wrap gap-2">
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

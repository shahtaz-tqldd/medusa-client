import React from "react";

// components
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Title, LabelText, Text } from "@/components/ui/typography";
// data

// icons
import { Award, Code } from "lucide-react";
import type { ExperienceDetailsDrawerProps } from "./_types";
import AnimateDiv from "@/components/animation/animate-div";

const ExperienceDetailsDrawer: React.FC<ExperienceDetailsDrawerProps> = ({
  data,
  isOpen,
  setIsOpen,
}) => {
  if (!data) {
    return null;
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <AnimateDiv className="space-y-10">
          <div className="space-y-4">
            <Title variant="lg">{data.position}</Title>
            <Text variant="lg" className={`${data.companyColor}`}>
              {data.company}
            </Text>
          </div>
          <div
            className="space-y-6 text-slate-600 dark:text-gray-400 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
          <div className="space-y-8 mt-6">
            <div className="space-y-4">
              <LabelText icon={Award}>Key Achievements</LabelText>
              <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-gray-400 leading-relaxed">
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
        </AnimateDiv>
      </DrawerContent>
    </Drawer>
  );
};

export default ExperienceDetailsDrawer;

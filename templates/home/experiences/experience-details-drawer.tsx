import React from "react";

// components
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Title, LabelText, Text } from "@/components/ui/typography";
// data

// icons
import { Award, Building2, Check, Code, Dot } from "lucide-react";
import type { ExperienceDetailsDrawerProps } from "./_types";
import AnimateDiv from "@/components/animation/animate-div";
import TechBadge from "@/components/ui/badge";

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
        <AnimateDiv className="space-y-12">
          <div className="space-y-4">
            <div className="flx gap-4">
              <div className={`${data.iconBg} p-4 rounded-2xl`}>
                <Building2 className={`w-7 h-7 ${data.companyColor}`} />
              </div>
              <div className="space-y-1">
                <Title variant="sm">{data.position}</Title>

                <div className="flx flex-wrap gap-x-2 gap-y-3">
                  <Text variant="sm" className={`${data.companyColor}`}>
                    {data.company}
                  </Text>
                  <Dot />
                  <Text variant="sm">{data.timeline}</Text>
                  <Dot />
                  <Text variant="sm">{data.location}</Text>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {data.highlights.map((h, i) => (
                <Text key={i} variant="sm" className="flx gap-2">
                  <Check size={14} className="text-emerald-500" />
                  {h}
                </Text>
              ))}
            </div>
          </div>

          <Text variant="lg">
            <span
              className="space-y-6 md:text-justify"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          </Text>

          <div className="space-y-4">
            <LabelText icon={Award}>Key Contributions</LabelText>
            <ul className="grid md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-4">
              {data.achievements.map((achievement, index) => (
                <div key={index} className="flex ">
                  <Dot
                    size={32}
                    className="-translate-x-2.5 -translate-y-0.5"
                  />
                  <Text variant="lg" className="flex-1">
                    {achievement}
                  </Text>
                </div>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <LabelText icon={Code}>Tech Stack Used</LabelText>
            <div className="flex flex-wrap gap-2">
              {data.technologies.map((tech, index) => (
                <TechBadge key={index}>{tech}</TechBadge>
              ))}
            </div>
          </div>
        </AnimateDiv>
      </DrawerContent>
    </Drawer>
  );
};

export default ExperienceDetailsDrawer;

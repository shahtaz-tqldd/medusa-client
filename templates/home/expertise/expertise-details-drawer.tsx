"use client";

import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Title, Text, LabelText } from "@/components/ui/typography";
import type { FeatureDetailsDrawerProps } from "./_types";
import { Check, Code2, Folder } from "lucide-react";
import AnimateDiv from "@/components/animation/animate-div";
import TechBadge from "@/components/ui/badge";

const ExpertiseDetailsDrawer = ({
  data,
  isOpen,
  setIsOpen,
}: FeatureDetailsDrawerProps) => {
  if (!data) return null;

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <AnimateDiv className="space-y-10">
          <div className="space-y-4">
            <Title>{data.title} Development</Title>
            <Text className="mt-4" variant="lg">
              {data.experience}
            </Text>
          </div>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-2">
            {data.keyPoints.map((point) => (
              <div key={point} className="flex gap-3">
                <Check className="mt-1.5 text-emerald-500" size={14} />
                <Text variant="lg" className="flex-1">
                  {point}
                </Text>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <LabelText icon={Code2}>Tech-Stack Proficiency</LabelText>
            <div className="flex flex-wrap gap-2 mt-2">
              {data.technologies.map((tech, idx) => (
                <TechBadge key={idx}>{tech}</TechBadge>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <LabelText icon={Folder}>Projects</LabelText>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
              {data.projects.map((project, idx) => (
                <div key={idx} className="">
                  <Title variant="xs" className="flex-1 font-semibold">
                    {project.name}
                  </Title>
                  <Text variant="sm" className="flex-1">
                    {project.description}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        </AnimateDiv>
      </DrawerContent>
    </Drawer>
  );
};

export default ExpertiseDetailsDrawer;

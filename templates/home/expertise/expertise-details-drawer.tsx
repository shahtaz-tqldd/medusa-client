"use client";

import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Title, Text } from "@/components/ui/typography";
import type { FeatureDetailsDrawerProps } from "./_types";

const ExpertiseDetailsDrawer = ({
  data,
  isOpen,
  setIsOpen,
}: FeatureDetailsDrawerProps) => {
  if (!data) return null;

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="p-6 max-w-3xl mx-auto">
        <Title>{data.title}</Title>

        <Text className="mt-4">{data.experience}</Text>

        <div className="mt-6">
          <Title variant="sm">Technologies</Title>
          <div className="flex flex-wrap gap-2 mt-2">
            {data.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-sm bg-white/5"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ExpertiseDetailsDrawer;

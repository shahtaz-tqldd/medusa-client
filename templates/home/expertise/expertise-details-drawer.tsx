"use client";

import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Title, Text, LabelText } from "@/components/ui/typography";
import { Check, Code2 } from "lucide-react";
import AnimateDiv from "@/components/animation/animate-div";
import TechBadge from "@/components/ui/badge";
import { ExpertiseProps } from "@/lib/api-service/expertise";

interface FeatureDetailsDrawerProps {
  data: ExpertiseProps | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ExpertiseDetailsDrawer = ({
  data,
  isOpen,
  setIsOpen,
}: FeatureDetailsDrawerProps) => {
  if (!data) return null;

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <AnimateDiv className="space-y-10 p-6">
          {/* Header */}
          <div className="space-y-4">
            <Title>{data.name} Development</Title>
            <Text variant="lg">{data.description}</Text>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-2">
            {data.features.map((feature) => (
              <div key={feature} className="flex gap-3">
                <Check className="mt-1.5 text-emerald-500" size={14} />
                <Text variant="lg" className="flex-1">
                  {feature}
                </Text>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="space-y-4">
            <LabelText icon={Code2}>Tech Stack</LabelText>
            <div className="flex flex-wrap gap-2">
              {data.tech_stacks.map((tech) => (
                <TechBadge key={tech}>{tech}</TechBadge>
              ))}
            </div>
          </div>
        </AnimateDiv>
      </DrawerContent>
    </Drawer>
  );
};

export default ExpertiseDetailsDrawer;

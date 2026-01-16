import React from "react";

// components
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { Title, LabelText, Text } from "@/components/ui/typography";
// data

// icons
import { Award, Building2, Code, Dot } from "lucide-react";
import AnimateDiv from "@/components/animation/animate-div";
import TechBadge from "@/components/ui/badge";
import { getDuration } from "@/lib/date";
import { ExperienceProps } from "@/lib/api-service/experiences";
import moment from "moment";
import { getCompanyColor } from "./utils";

interface ExperienceDetailsDrawerProps {
  data: ExperienceProps | null;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExperienceDetailsDrawer: React.FC<ExperienceDetailsDrawerProps> = ({
  data,
  isOpen,
  setIsOpen,
}) => {
  if (!data) {
    return null;
  }

  const color = getCompanyColor(data?.company_name);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerTitle hidden></DrawerTitle>
        <AnimateDiv className="space-y-8 md:space-y-12">
          <div className="space-y-4">
            <div className="flx gap-4">
              <div className={`${color.bg} p-4 rounded-2xl`}>
                <Building2 className={`w-7 h-7 ${color.text}`} />
              </div>
              <div className="space-y-1">
                <Title variant="sm">
                  {data.position} at {data.company_name}
                </Title>

                <div className="flx flex-wrap gap-x-2 gap-y-3">
                  <div className="hidden md:flex items-center">
                    <div className="flx gap-2">
                      <Text variant="sm">
                        {moment(data.started_at).format("DD MMM YYYY")}
                      </Text>
                      <span>-</span>
                      <Text variant="sm">
                        {!data?.ended_at
                          ? "Present"
                          : moment(data.ended_at).format("MMM YYYY")}
                      </Text>
                    </div>
                    <Dot />
                    <Text variant="sm">{data.company_location}</Text>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-1 md:hidden items-center">
              <Text variant="sm">{data.company_location}</Text>
              <Dot />
              <Text variant="sm">
                {getDuration(data?.started_at, data?.ended_at || undefined)}
              </Text>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {data.highlights.map((h, i) => (
                <Text key={i} variant="sm" className="!text-blue-500 flx gap-2">
                  # {h}
                </Text>
              ))}
            </div>
          </div>

          <Text variant="lg">
            <span
              className="space-y-6 md:text-justify"
              dangerouslySetInnerHTML={{ __html: data.details }}
            />
          </Text>

          <div className="space-y-4">
            <LabelText icon={Award}>Key Contributions</LabelText>
            <ul className="grid md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-4">
              {data.key_contributions.map((contribution, index) => (
                <div key={index} className="flex ">
                  <Dot
                    size={32}
                    className="-translate-x-2.5 -translate-y-0.5"
                  />
                  <Text variant="lg" className="flex-1">
                    {contribution}
                  </Text>
                </div>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <LabelText icon={Code}>Tech Stack Used</LabelText>
            <div className="flex flex-wrap gap-2">
              {data.tech_stacks.map((tech, index) => (
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

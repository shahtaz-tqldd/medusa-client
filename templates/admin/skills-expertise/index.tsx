import React from "react";

import { Text, Title } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { skillGroups } from "@/templates/home/about-me/_data";
import TechBadge from "@/components/ui/badge";
import { colors } from "@/lib/colors";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const SkillsExpertisePage = () => {
  return (
    <div className="space-y-12">
      <div className="flbx">
        <div>
          <Title>Skills & Expertise</Title>
          <Text variant="sm">
            Update your skills and expertise on regular way
          </Text>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="border dark:border-white/15 border-gray-200 rounded-xl overflow-hidden">
            <div className="py-3 px-6 dark:bg-[#000] bg-emerald-500/10">
              <Title variant="xs">Expertise</Title>
            </div>
            <div className="py-4 px-6 space-y-6">
              <Text variant="sm">
                I’m a software developer with around 2.5 years of experience. I
                started my journey in frontend development, where I enjoyed
                turning UI designs into working prototypes that worked smoothly
                across different browsers and devices. Working on interfaces
                helped me understand user experience, consistency, and how small
                details in layout or behavior can make a big difference.{" "}
              </Text>
              <Text variant="sm">
                As I grew, I moved into backend development and found a real
                interest in solving problems behind the scenes. I focus on
                writing clean, readable code and building backend systems that
                are efficient, reliable, and easy to maintain. When I design a
                feature, I always think about performance, structure, and how
                the system will behave in real usage. I like working on projects
                where I can take ownership, understand the full flow, and build
                things that actually help users and teams.
              </Text>
            </div>
          </div>
          <div className="border dark:border-white/15 border-gray-200 rounded-xl overflow-hidden">
            <div className="py-3 px-6 dark:bg-[#000] bg-emerald-500/10">
              <Title variant="xs">My Story</Title>
            </div>
            <div className="py-4 px-6 space-y-6">
              <Text variant="sm">
                I’m a software developer with around 2.5 years of experience. I
                started my journey in frontend development, where I enjoyed
                turning UI designs into working prototypes that worked smoothly
                across different browsers and devices. Working on interfaces
                helped me understand user experience, consistency, and how small
                details in layout or behavior can make a big difference.{" "}
              </Text>
              <Text variant="sm">
                As I grew, I moved into backend development and found a real
                interest in solving problems behind the scenes. I focus on
                writing clean, readable code and building backend systems that
                are efficient, reliable, and easy to maintain. When I design a
                feature, I always think about performance, structure, and how
                the system will behave in real usage. I like working on projects
                where I can take ownership, understand the full flow, and build
                things that actually help users and teams.
              </Text>
            </div>
          </div>
        </div>
        <div className="space-y-8">
          {Object.entries(skillGroups).map(([group, items], i) => (
            <div key={i} className="space-y-4">
              <Title variant="xs" className="uppercase">
                {group}
              </Title>
              <div className="flex flex-wrap gap-2">
                {items.map(({ name }, idx) => (
                  <TechBadge key={idx} color={colors[i]}>
                    {name}
                  </TechBadge>
                ))}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                // onClick={() => appendFeature({ content: "" })}
              >
                <Plus size={14} className="mr-1" /> Add Skill
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsExpertisePage;

import React from "react";
import Image from "next/image";

// components
import AnimateIn from "@/components/animation/animate-in";
import AnimateDiv from "@/components/animation/animate-div";
import ShinyText from "@/components/animation/shiny-text";
import { Text, Title } from "@/components/ui/typography";

// data
import TechBadge from "@/components/ui/badge";
import { SkillsProps } from "@/lib/api-service/skills";
import { mapApiSkillsToGroups } from "@/templates/admin/skills-expertise";
import { colors } from "@/lib/colors";

const AboutMe: React.FC<{ data: SkillsProps }> = ({ data }) => {
  const skillGroups = mapApiSkillsToGroups(data);

  return (
    <div id="about" className="container py-8 md:py-20 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-16 gap-8 relative z-10">
        <div>
          <AnimateDiv>
            <div>
              <ShinyText>About Me</ShinyText>
              <Title variant="lg" className="mt-2">
                Let me Introduce myself
              </Title>
            </div>
            <Text variant="lg" className="mt-8 md:text-justify">
              <span
                dangerouslySetInnerHTML={{
                  __html: data.expertise.replace(/\n\n/g, "<br /><br />"),
                }}
              />
            </Text>
          </AnimateDiv>
        </div>

        <div className="space-y-8 mt-8">
          <AnimateIn index={0}>
            <Title>Tech Stack Proficiency</Title>
          </AnimateIn>

          <AnimateDiv className="space-y-12">
            {Object.entries(skillGroups).map(([group, items], i) => (
              <div key={i}>
                <h3 className="font-medium uppercase mb-4">{group}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((item, idx) => (
                    <TechBadge key={idx} color={colors[i]}>
                      {item.name}
                    </TechBadge>
                  ))}
                </div>
              </div>
            ))}
          </AnimateDiv>
        </div>
      </div>

      <div className="absolute -left-[380px] -top-68 z-0 pointer-events-none">
        <Image
          src="/elipse_4.svg"
          height={800}
          width={800}
          alt="bg"
          className="opacity-40"
        />
      </div>
    </div>
  );
};

export default AboutMe;

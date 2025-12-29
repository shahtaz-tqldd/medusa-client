import React from "react";
import Image from "next/image";

// components
import AnimateIn from "@/components/animation/animate-in";
import AnimateDiv from "@/components/animation/animate-div";
import ShinyText from "@/components/animation/shiny-text";
import { Text, Title } from "@/components/ui/typography";

// data
import { skillGroups } from "./_data";

const AboutMe: React.FC = () => {
  const colors = [
    "!text-emerald-500",
    "!text-orange-400",
    "!text-blue-500",
    "!text-rose-500",
  ];

  return (
    <div id="about" className="container py-20 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-16 gap-8 relative z-10">
        <div>
          <AnimateDiv>
            <div>
              <ShinyText>🔥 About Me</ShinyText>
              <Title variant="lg" className="mt-2">
                Let me Introduce myself
              </Title>
            </div>
            <Text className="mt-8 !text-lg md:text-justify">
              I’m a software developer with around 2.5 years of experience. I
              started my journey in frontend development, where I enjoyed
              turning UI designs into working prototypes that worked smoothly
              across different browsers and devices. Working on interfaces
              helped me understand user experience, consistency, and how small
              details in layout or behavior can make a big difference.
            </Text>
            <Text className="mt-6 !text-lg md:text-justify">
              As I grew, I moved into backend development and found a real
              interest in solving problems behind the scenes. I focus on writing
              clean, readable code and building backend systems that are
              efficient, reliable, and easy to maintain. When I design a
              feature, I always think about performance, structure, and how the
              system will behave in real usage. I like working on projects where
              I can take ownership, understand the full flow, and build things
              that actually help users and teams.
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
                  {items.map(({ name }, idx) => (
                    <div
                      key={idx}
                      className="py-1 px-3.5 rounded-full bg-emerald-300/5 border-2 border-emerald-400/5"
                    >
                      <Text
                        variant="xs"
                        className={`font-semibold ${colors[i]}`}
                      >
                        {name}
                      </Text>
                    </div>
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

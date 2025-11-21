"use client";
import React, { useState } from "react";
import Image from "next/image";

// components
import AnimateDiv from "@/components/animation/animate-div";
import BodyText from "@/components/text/body-text";
import FeatureCard from "./feature-card";
import FeatureModal from "./feature-modal";
import HeroText from "@/components/text/hero-text";
import { AnimatedShinyText } from "@/components/text/shiny-text";

// data
import { features, skillGroups } from "./_demo-data";
import { FeatureProps } from "./_types";
import { Dot } from "lucide-react";

const Features: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [featureData, setFeatureData] = useState<FeatureProps | null>(null);

  const handleFeatureOpen = (data: FeatureProps) => {
    setIsOpen(true);
    setFeatureData(data);
  };

  return (
    <div id="about" className="container py-12 md:py-20 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-16 gap-8 relative z-10">
        <div>
          <AnimatedShinyText>🔥 About Me</AnimatedShinyText>
          <HeroText className="">Let me Introduce myself</HeroText>
          <BodyText className="mt-8 text-lg text-justify" animated delay={0.3}>
            I’m a software developer with around 2.5 years of experience. I
            started my journey in frontend development, where I enjoyed turning
            UI designs into working prototypes that worked smoothly across
            different browsers and devices. Working on interfaces helped me
            understand user experience, consistency, and how small details in
            layout or behavior can make a big difference.
          </BodyText>
          <BodyText className="mt-4 text-lg text-justify" animated delay={0.4}>
            As I grew, I moved into backend development and found a real
            interest in solving problems behind the scenes. I focus on writing
            clean, readable code and building backend systems that are
            efficient, reliable, and easy to maintain. When I design a feature,
            I always think about performance, structure, and how the system will
            behave in real usage. I like working on projects where I can take
            ownership, understand the full flow, and build things that actually
            help users and teams.
          </BodyText>
        </div>

        <div className="space-y-8 mt-12">
          <h3 className="text-2xl font-semibold">Tech Stack Proficiency</h3>
          <AnimateDiv delay={0.4} className="space-y-8">
            {Object.entries(skillGroups).map(([group, items]) => (
              <div key={group}>
                <h3 className="font-medium uppercase mb-2 opacity-80">
                  {group}
                </h3>

                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {items.map(({ name }, idx) => (
                    <BodyText key={idx} className="flx gap-1 -ml-2.5">
                      <Dot />
                      {name}
                    </BodyText>
                  ))}
                </div>
              </div>
            ))}
          </AnimateDiv>
        </div>
      </div>
      <div className="mt-12 md:mt-20 space-y-8">
        <h3 className="text-2xl font-semibold">Domains of Expertise</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features?.map((data, index) => (
            <FeatureCard
              key={index}
              data={data}
              index={index}
              handleFeatureOpen={handleFeatureOpen}
            />
          ))}
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

      {isOpen && (
        <FeatureModal
          data={featureData}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
};

export default Features;

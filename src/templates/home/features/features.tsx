"use client";
import React, { useState } from "react";
import Image from "next/image";

// components
import BodyText from "@/components/text/body-text";
import HeroText from "@/components/text/hero-text";
import SkillSearch from "./skill-search";
import FeatureCard from "./feature-card";
import FeatureModal from "./feature-modal";

// data
import { features, skills } from "./_demo-data";
import { FeatureProps } from "./_types";
import SkillModal from "./skill-modal";
import AnimateDiv from "@/components/animation/animate-div";

const Features: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [featureData, setFeatureData] = useState<FeatureProps | null>(null);

  const handleFeatureOpen = (data: FeatureProps) => {
    setIsOpen(true);
    setFeatureData(data);
  };

  return (
    <div className="container py-12 md:py-20 relative">
      <div className="grid grid-cols-5 md:gap-20 gap-12">
        <div className="col-span-5 md:col-span-2 relative z-10">
          <HeroText className="-translate-y-4">
            Let me Introduce myself
          </HeroText>
          <BodyText className="mt-4" animated delay={0.3}>
            Hey, I have been in web development for almost 3 years, I have
            developed enormous amount of software to get the perfection. I have
            worked with React, Node Js.
          </BodyText>
          <AnimateDiv delay={0.5}>
            <div className="flex flex-wrap mt-8 md:mt-12 gap-2.5">
              {skills.slice(0, 9)?.map(({ name, icon: Icon }, index) => (
                <div
                  key={index}
                  className="dark:text-blue-100 text-slate-800 flx gap-2 py-2 px-4 text-sm rounded-full border border-dashed dark:bg-white/[0.03] bg-blue-500/5 dark:border-white/10 border-blue-500/10"
                >
                  <Icon className="h-4 w-4" />
                  {name}
                </div>
              ))}
              <button
                onClick={() => setIsSkillModalOpen(true)}
                className="mt-2.5 dark:text-blue-500 text-blue-600"
              >
                ... {skills.length - 9} more
              </button>
            </div>
          </AnimateDiv>
          <AnimateDiv delay={0.7}>
            <SkillSearch />
          </AnimateDiv>
        </div>
        <div className="col-span-5 md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-5">
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
      {isSkillModalOpen && (
        <SkillModal
          data={skills}
          isOpen={isSkillModalOpen}
          setIsOpen={setIsSkillModalOpen}
        />
      )}
    </div>
  );
};

export default Features;

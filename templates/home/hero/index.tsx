"use client";

import React, { useState } from "react";

// components
import AnimateDiv from "@/components/animation/animate-div";
import MyStoryDrawer from "./my-story-drawer";
import HeroImage from "./hero-img";
import BgGrid from "./bg-grid";
import ShinyText from "@/components/animation/shiny-text";
import { Text, Title } from "@/components/ui/typography";

// icons
import { Dot } from "lucide-react";

const Hero: React.FC<{
  title: string;
  my_story: string;
  focus_areas: string[];
}> = ({ title, my_story, focus_areas }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-8 md:py-20 h-auto w-screen center overflow-hidden relative">
      <div className="container flbx md:flex-row flex-col-reverse relative -mt-8 md:mt-8">
        <div>
          <AnimateDiv>
            <ShinyText className="inline-flex items-center">
              <Dot className="text-emerald-500 -ml-3.5 -mr-1.5" size={40} />
              Full-stack Software Developer
            </ShinyText>
            <Title variant="lg" className="max-w-2xl">
              {title}
            </Title>
            <Text className="max-w-lg mt-10 md:mt-14">
              Interested to know my story of becoming a software developer —{" "}
              <button
                onClick={() => setIsOpen(true)}
                className="dark:text-lime-400 text-emerald-600"
              >
                <span>Here’s a short version</span>
              </button>
            </Text>
            <div className="mt-10 md:mt-32 -ml-2.5 flex items-center flex-wrap gap-x-4 gap-y-2 font-medium dark:text-gray-300 text-slate-600 text-sm">
              {focus_areas?.map((skill, idx) => (
                <Text
                  key={idx}
                  variant="sm"
                  className="whitespace-nowrap flx gap-1"
                >
                  <Dot />
                  {skill}
                </Text>
              ))}
            </div>
          </AnimateDiv>
        </div>
        <HeroImage />
      </div>
      <BgGrid />
      <MyStoryDrawer isOpen={isOpen} setIsOpen={setIsOpen} content={my_story} />
    </section>
  );
};

export default Hero;

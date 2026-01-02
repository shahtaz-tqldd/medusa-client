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

const Hero: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const SKILLS = ["React", "Node JS", "Django", "FastAPI"];

  return (
    <section className="md:py-24 py-10 h-auto w-screen center overflow-hidden relative">
      <div className="container flbx md:flex-row flex-col-reverse relative -mt-8 md:mt-8">
        <div>
          <AnimateDiv>
            <ShinyText className="inline-flex items-center">
              <Dot className="text-emerald-500 -ml-3.5 -mr-1.5" size={40} />
              Full-stack Software Developer
            </ShinyText>
            <Title variant="lg" className="max-w-2xl">
              Hey, this is Shahtaz. I am a software developer by passion, and a
              full-stack alchemist by choice!
            </Title>
            <Text className="max-w-lg mt-14">
              Interested to know my story of becoming a software developer —{" "}
              <button
                onClick={() => setIsOpen(true)}
                className="dark:text-blue-500 text-blue-700"
              >
                <span>Here’s a short version</span>
              </button>
            </Text>
            <div className="mt-12 md:mt-32 -ml-2.5 flex items-center flex-wrap gap-x-4 gap-y-2 font-medium dark:text-gray-300 text-slate-600 text-sm">
              {SKILLS.map((skill, idx) => (
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
      <MyStoryDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
    </section>
  );
};

export default Hero;

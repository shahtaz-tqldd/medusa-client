"use client";

import React, { useState } from "react";

// components
import MyStoryDialog from "./my-story-dialog";
import FadingGrid from "./fade-grid";
import HeroText from "@/components/text/hero-text";
import AnimateDiv from "@/components/animation/animate-div";
import { AnimatedShinyText } from "@/components/text/shiny-text";

// icons
import { ArrowRight, Dot } from "lucide-react";
import BodyText from "@/components/text/body-text";
import HeroImage from "./hero-img";

const Hero: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const HERO_STRING =
    "Hey, this is Shahtaz. I am a software\n developer by passion, and\n a full-stack alchemist by choice!";

  return (
    <section className="min-h-screen w-screen center relative">
      <div className="container flbx md:flex-row flex-col-reverse relative">
        <div className="md:mt-20">
          <AnimatedShinyText>
            ✨ Full-stack Software Developer
          </AnimatedShinyText>
          <HeroText className="max-w-2xl">{HERO_STRING}</HeroText>
          <AnimateDiv delay={0.5} className="space-y-2 mt-12">
            <BodyText className="text-lg md:text-xl">
              Interested to know the backstory behind how I became a developer?
            </BodyText>

            <button
              onClick={() => setIsOpen(true)}
              className="dark:text-blue-500 text-blue-700 font-medium flx gap-2 group"
            >
              <ArrowRight className="h-4 group-hover:translate-x-1 tr" />
              <span className="">Here’s a short version.</span>
            </button>
          </AnimateDiv>
          <AnimateDiv delay={0.6}>
            <div className="mt-12 md:mt-32 flex items-center gap-2 font-medium dark:text-gray-300 text-slate-600 text-sm">
              <h2 className="">React</h2>
              <Dot />
              <h2 className="">Node JS</h2>
              <Dot />
              <h2 className="">Python & Django</h2>
              <Dot />
              <h2 className="">FastAPI</h2>
            </div>
          </AnimateDiv>
        </div>

        <HeroImage />
      </div>
      <FadingGrid />
      {isOpen && <MyStoryDialog isOpen={isOpen} setIsOpen={setIsOpen} />}
    </section>
  );
};

export default Hero;

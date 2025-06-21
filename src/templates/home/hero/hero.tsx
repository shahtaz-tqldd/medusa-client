"use client";

import React, { useState } from "react";

// components
import DevJourneyModal from "./dev-journey-modal";
import FadingGrid from "./fade-grid";
import HeroText from "@/components/text/hero-text";
import HeroEve from "@/components/3d-models/hero-eve";
import { AnimatedShinyText } from "@/components/text/shiny-text";

// icons
import { Dot } from "lucide-react";
import BodyText from "@/components/text/body-text";
import AnimateDiv from "@/components/animation/animate-div";

const Hero: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const HERO_STRING =
    "Hey, this is Shahtaz. I am a software\n developer by passion, and\n a full-metal alchemist by choice!";

  return (
    <section className="h-screen w-screen center relative">
      <div className="container flbx md:flex-row flex-col-reverse relative">
        <div className="mt-20">
          <AnimatedShinyText>✨ Software Developer</AnimatedShinyText>
          <HeroText className="max-w-2xl">{HERO_STRING}</HeroText>
          <AnimateDiv delay={0.8}>
            <p className="text-base md:text-lg mt-12 relative">
              <span className="dark:text-gray-400 text-slate-600">
                Interested to know my development journey?
              </span>{" "}
              <button
                onClick={() => setIsOpen(true)}
                className="dark:text-blue-500 text-blue-700 font-medium"
              >
                Read my story
              </button>
            </p>
          </AnimateDiv>
          <div className="mt-12 md:mt-32 flex items-center gap-2 font-medium dark:text-gray-300 text-slate-600 text-sm">
            <h2 className="">React</h2>
            <Dot />
            <h2 className="">Node JS</h2>
            <Dot />
            <h2 className="">Python & Django</h2>
          </div>
        </div>
        <HeroEve />
      </div>
      <FadingGrid />
      {isOpen && <DevJourneyModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </section>
  );
};

export default Hero;

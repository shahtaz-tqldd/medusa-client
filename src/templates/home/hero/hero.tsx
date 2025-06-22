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
import AnimateDiv from "@/components/animation/animate-div";
import Image from "next/image";

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
          <AnimateDiv delay={0.5}>
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
          <AnimateDiv delay={0.6}>
            <div className="mt-12 md:mt-32 flex items-center gap-2 font-medium dark:text-gray-300 text-slate-600 text-sm">
              <h2 className="">React</h2>
              <Dot />
              <h2 className="">Node JS</h2>
              <Dot />
              <h2 className="">Python & Django</h2>
            </div>
          </AnimateDiv>
        </div>
        <HeroEve />
        {/* <div className="relative -translate-x-20">
          <Image src="/shahtaz.png" alt="" height={500} width={500} className="" />
          <div className="w-full h-20 absolute bottom-0 left-0 right-0  bg-gradient-to-t dark:from-[#121212] from-white dark:to-black/0 to-white/0">

          </div>
        </div> */}
      </div>
      <FadingGrid />
      {isOpen && <DevJourneyModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </section>
  );
};

export default Hero;

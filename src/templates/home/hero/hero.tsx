"use client";

import React, { useState } from "react";
import Image from "next/image";

// components
import DevJourneyModal from "./dev-journey-modal";
import FadingGrid from "./fade-grid";
import HeroText from "@/components/text/hero-text";
import AnimateDiv from "@/components/animation/animate-div";
import { AnimatedShinyText } from "@/components/text/shiny-text";

// icons
import { ArrowRight, Dot } from "lucide-react";

const Hero: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const HERO_STRING =
    "Hey, this is Shahtaz. I am a software\n developer by passion, and\n a full-stack alchemist by choice!";

  return (
    <section className="h-screen w-screen center relative">
      <div className="container flbx md:flex-row flex-col-reverse relative">
        <div className="mt-20">
          <AnimatedShinyText>
            ✨ Full-stack Software Developer
          </AnimatedShinyText>
          <HeroText className="max-w-2xl">{HERO_STRING}</HeroText>
          <AnimateDiv delay={0.5}>
            <p className="text-base md:text-lg mt-12 relative">
              <span className="dark:text-gray-400 text-slate-600">
                Interested to know the backstory behind how I became a
                developer?
              </span>
              <br />
              <button
                onClick={() => setIsOpen(true)}
                className="dark:text-blue-500 text-blue-700 font-medium flx gap-2 group"
              >
                <ArrowRight className="h-4 group-hover:translate-x-1 tr"/>
                <span className="">Here’s a short version.</span>
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
              <Dot />
              <h2 className="">FastAPI</h2>
            </div>
          </AnimateDiv>
        </div>
        <div className="relative h-[220px] md:h-[480px] w-[220px] md:w-[480px] overflow-hidden center">
          <Image
            src="/hero.png"
            alt="Hero"
            width={500}
            height={500}
            className="object-cover"
          />

          {/* Bottom overlay */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t dark:from-[#121212] from-white to-transparent pointer-events-none"></div>
        </div>
      </div>
      <FadingGrid />
      {isOpen && <DevJourneyModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </section>
  );
};

export default Hero;

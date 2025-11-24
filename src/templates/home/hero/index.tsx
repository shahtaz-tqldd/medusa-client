"use client";

import React, { useState } from "react";

// components
import MyStoryDialog from "./my-story-dialog";
import FadingGrid from "./fade-grid";
import AnimateIn from "@/components/animation/animate-in";
import BodyText from "@/components/text/body-text";
import HeroImage from "./hero-img";
import { AnimatedShinyText } from "@/components/text/shiny-text";

// icons
import { ArrowRight, Dot } from "lucide-react";

const Hero: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const HERO_STRING =
    "Hey, this is Shahtaz. I am a software\n developer by passion, and\n a full-stack alchemist by choice!";

  const SKILLS = ["React", "Node JS", "Python & Django", "FastAPI"];

  return (
    <section className="min-h-screen w-screen center relative">
      <div className="container flbx md:flex-row flex-col-reverse relative md:mt-8">
        <div>
          <AnimateIn index={0}>
            <AnimatedShinyText>
              ✨ Full-stack Software Developer
            </AnimatedShinyText>
          </AnimateIn>
          <AnimateIn
            index={0.25}
            className="font-medium text-2xl leading-[140%] md:text-4xl max-w-2xl mt-4 mb-12"
          >
            {HERO_STRING}
          </AnimateIn>
          <AnimateIn index={0.5}>
            <BodyText className="text-lg md:text-xl">
              Interested to know my story of becoming a software developer?
            </BodyText>
            <button
              onClick={() => setIsOpen(true)}
              className="dark:text-blue-500 text-blue-700 font-medium flx gap-2 group text-lg md:text-xl"
            >
              <ArrowRight className="h-4 group-hover:translate-x-1 tr" />
              <span className="">Here’s a short version.</span>
            </button>
          </AnimateIn>

          <AnimateIn index={0.6}>
            <div className="mt-12 md:mt-32 -ml-2.5 flex items-center flex-wrap gap-x-4 gap-y-2 font-medium dark:text-gray-300 text-slate-600 text-sm">
              {SKILLS.map((skill, idx) => (
                <p
                  key={idx}
                  className="whitespace-nowrap flex items-center gap-1"
                >
                  <Dot />
                  {skill}
                </p>
              ))}
            </div>
          </AnimateIn>
        </div>

        <HeroImage />
      </div>
      <FadingGrid />
      <MyStoryDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </section>
  );
};

export default Hero;

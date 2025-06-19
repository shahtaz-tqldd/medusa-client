"use client";

import React, { useState } from "react";
import Image from "next/image";

// components
import HeroText from "@/components/text/hero-text";
import HeroEve from "@/components/3d-models/hero-eve";
import DevJourneyModal from "./dev-journey-modal";

// icons
import { Dot } from "lucide-react";
import FadingGrid from "./fade-grid";

const Hero: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="h-screen w-screen center relative">
      <div className="container flbx relative">
        <div className="mt-20">
          <HeroText className="max-w-2xl text-4xl leading-[48px] font-medium">
            Hey, this is Shahtaz. I am a software developer by passion, and a
            full-metal alchemist by choice!
          </HeroText>
          <p className="text-lg mt-12 relative">
            <span className=" opacity-75">
              Feel free to read my developer journey
            </span>{" "}
            <button
              onClick={() => setIsOpen(true)}
              className="text-orange-600 dark:text-orange-300"
            >
              from here
              <Image
                src="/elipse_3.svg"
                width={160}
                height={160}
                className="absolute -top-16 left-68 opacity-50"
                alt=""
              ></Image>
            </button>{" "}
            <span className=" opacity-75">by the way</span>
          </p>
          <div className="mt-32 flex items-center gap-2 text-sm">
            <h2 className="opacity-80 font-medium">React</h2>
            <Dot />
            <h2 className="opacity-80 font-medium">Node JS</h2>
            <Dot />
            <h2 className="opacity-80 font-medium">Python & Django</h2>
          </div>
        </div>
        <HeroEve />
      </div>
      {
        isOpen && <DevJourneyModal isOpen={isOpen} setIsOpen={setIsOpen} />
      }
      <FadingGrid />
    </section>
  );
};

export default Hero;

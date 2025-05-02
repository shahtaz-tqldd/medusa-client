import React from "react";
import Link from "next/link";

// components
import HeroText from "@/components/text/hero-text";
import HeroEve from "@/components/3d-models/hero-eve";

// icons
import { Dot } from "lucide-react";

const Hero : React.FC = () => {
  return (
    <section className="h-screen w-screen center">
      <div className="container flbx relative">
        
        <div className="mt-20">
          <HeroText className="max-w-2xl text-4xl">
            Hey, this is Shahtaz. I am a software developer by passion, and a
            full-metal alchemist by choice!
          </HeroText>
          <p className="text-lg mt-8">
            <span className=" opacity-75">
              Feel free to read my developer journey
            </span>{" "}
            <Link href={"/"} className="text-violet-900 dark:text-orange-500">
              from here
            </Link>{" "}
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
    </section>
  );
};

export default Hero;

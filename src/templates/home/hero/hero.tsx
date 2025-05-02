import HeroText from "@/components/custom-ui/hero-text";
import HeroModel from "@/components/custom-ui/model-viewer";
import Link from "next/link";
import React from "react";
import { Dot } from "lucide-react";
import Image from "next/image";

const Hero = () => {
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
            <h2>React</h2>
            <Dot />
            <h2>Node JS</h2>
            <Dot />
            <h2>Django</h2>
          </div>
        </div>

        <HeroModel />
        <div className="absolute -right-28 -top-36 z-0">
          <Image
            src="/elipse_1.svg"
            height={800}
            width={800}
            alt="bg"
            className=""
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

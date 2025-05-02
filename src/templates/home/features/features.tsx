import HeroText from "@/components/custom-ui/hero-text";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import { features, skills } from "./data";

const Features = () => {
  return (
    <div className="container pb-40 relative">
      <div className="grid grid-cols-5 gap-20">
        <div className="col-span-2 relative z-10">
          <HeroText className="text-4xl">What I am good at</HeroText>
          <p className="mt-8 opacity-75">
            Hey, I have been in web development for almost 3 years, I have
            developed enormous amount of software to get the perfection. I have
            worked with React, Node Js.
          </p>

          <div className="flex flex-wrap mt-10 gap-3">
            {skills.slice(0, 9)?.map(({ name, icon: Icon }, index) => (
              <div
                key={index}
                className="flx gap-2 py-2 px-4 text-sm rounded-full border border-dashed dark:border-white/10 border-violet-600/10 dark:bg-white/[0.01] bg-emerald-600/[0.02]"
              >
                <Icon className="h-4 w-4" />
                {name}
              </div>
            ))}
            <span className="mt-2.5 opacity-60">... {skills.length - 9} more</span>
            <div className="mt-12">
              <h2 className="opacity-60 mb-4">Looking for any particular skillset?</h2>
              <button className="py-2 px-4 dark:bg-white rounded-full text-violet-900 text-sm font-medium">Search Skills</button>
            </div>
          </div>
        </div>
        <div className="col-span-3 grid grid-cols-2 gap-5">
          {features?.map(({ title, text, icon: Icon }, index) => (
            <div
              key={index}
              className="p-5 border border-dashed dark:border-white/10 border-violet-600/10 dark:bg-white/[0.01] bg-emerald-600/[0.02] rounded-2xl flex flex-col justify-between gap-8"
            >
              <div>
                <div className="flx gap-2.5 mb-4">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                  <h2 className="text-lg font-semibold">{title}</h2>
                </div>
                <p className="opacity-60">{text}</p>
              </div>
              <div className="flx gap-2 text-sm">
                <h2>Know Details</h2>
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute -left-80 -top-68 z-0">
        <Image
          src="/elipse_4.svg"
          height={800}
          width={800}
          alt="bg"
          className="dark:opacity-60 opacity-40"
        />
      </div>
    </div>
  );
};

export default Features;

import React from "react";
import HeroText from "@/components/text/hero-text";
import { WORK_EXPERIENCES } from "./data";

const Experiences = () => {
  return (
    <section className="container pb-32">
      <HeroText className="text-4xl">Professional Experiences</HeroText>
      <div className="mt-12 grid grid-cols-2 gap-8">
        {WORK_EXPERIENCES?.map((item, index) => (
          <div
            key={index}
            className="border dark:border-white/20 dark:bg-white/[0.02] border-purple-500/20 border-dashed p-6 rounded-2xl"
          >
            <p className="dark:text-orange-300 text-orange-500">
              {item.timeline}
            </p>
            <h2 className="text-xl mt-4 font-medium">{item.position}</h2>
            <p className="opacity-75 mt-2 text-sm">{item.comapny}</p>
            <p className="opacity-60 mt-4">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experiences;

"use client"

import React, { useState } from "react";
import HeroText from "@/components/text/hero-text";
import { WORK_EXPERIENCES } from "./data";
import ExperienceModal from "./experience-modal";
import { ExperienceProps } from "./types";
import LordIcon from "@/assets/icons/lord-icon";
import SecondaryButton from "@/components/buttons/secondary-button";

const Experiences = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expData, setExpData] = useState<ExperienceProps| null>(null)

  const handleReadMore =(data:ExperienceProps)=>{
    setIsOpen(true)
    setExpData(data)
  }
  return (
    <section className="container pb-32">
      <HeroText className="text-4xl">Work Experiences</HeroText>
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
            <p className={`mt-2 text-sm uppercase ${item.companyColor}`}>{item.comapny}</p>
            <p className="opacity-60 mt-4">{item.description}</p>
            
            <SecondaryButton onClick={()=>handleReadMore(item)} className="mt-6">
              Read More
            </SecondaryButton>
          </div>

        ))}
      </div>

      <ExperienceModal data={expData} isOpen={isOpen} setIsOpen={setIsOpen}/>
    </section>
  );
};

export default Experiences;

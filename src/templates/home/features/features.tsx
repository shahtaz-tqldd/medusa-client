import React, { useState } from "react";
import Image from "next/image";

// components
import HeroText from "@/components/text/hero-text";
import SkillSearch from "./skill-search";
import FeatureCard from "./feature-card";

// data
import { features, skills } from "./data";
import FeatureDrawer from "./feature-drawer";
import { FeatureProps } from "./types";

const Features: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [featureData, setFeatureData] = useState<FeatureProps | null>(null);

  const handleFeatureOpen = (data: FeatureProps) => {
    setIsOpen(true);
    setFeatureData(data);
  };
  return (
    <div className="container pb-40 relative">
      <div className="grid grid-cols-5 gap-20">
        <div className="col-span-2 relative z-10">
          <HeroText className="text-4xl">Let me Introduce myself</HeroText>
          <p className="mt-5 opacity-75">
            Hey, I have been in web development for almost 3 years, I have
            developed enormous amount of software to get the perfection. I have
            worked with React, Node Js.
          </p>

          <div className="flex flex-wrap mt-12 gap-3">
            {skills.slice(0, 9)?.map(({ name, icon: Icon }, index) => (
              <div
                key={index}
                className="flx gap-2 py-2 px-4 text-sm rounded-full border border-dashed dark:border-white/10 border-violet-600/10 dark:bg-white/[0.03] bg-emerald-600/[0.02]"
              >
                <Icon className="h-4 w-4" />
                {name}
              </div>
            ))}
            <span className="mt-2.5 opacity-60">
              ... {skills.length - 9} more
            </span>
          </div>
          <SkillSearch />
        </div>
        <div className="col-span-3 grid grid-cols-2 gap-5">
          {features?.map((data, index) => (
            <FeatureCard
              key={index}
              data={data}
              handleFeatureOpen={handleFeatureOpen}
            />
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
      <FeatureDrawer data={featureData} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Features;

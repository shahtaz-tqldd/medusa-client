import React from "react";
import HeroEve from "../hero/hero-eve";
import BodyText from "@/components/text/body-text";
import HeroText from "@/components/text/hero-text";

const SoftSkills = () => {
  return (
    <div className="container py-12 md:py-20 relative">
      <div className="flex md:flex-row flex-col gap-6 items-center justify-between -mt-32 md:mt-0">
        <HeroEve />
        <div className="max-w-2xl space-y-4">
          <HeroText className="max-w-xl">
            How I Work with People as a Developer
          </HeroText>
          <BodyText className="md:text-lg">
            As a software developer, my interpersonal skills shape the way I
            work as much as my technical abilities do. I communicate clearly and
            openly, whether I’m explaining a problem, sharing an idea, or asking
            for help. I try to express myself in a way that’s easy for others to
            understand. One of my strengths is staying calm during complex
            discussions and keeping the focus on the actual problem instead of
            getting caught in the noise around it.
          </BodyText>
          <BodyText className="md:text-lg">
            I’m also good at active listening, so I can understand what
            teammates need from me. At the same time, I’m aware of my
            weaknesses. I sometimes over-think decisions or get too focused on
            details, and I’m learning to balance that by trusting the process
            and communicating earlier.
          </BodyText>
        </div>
      </div>
    </div>
  );
};

export default SoftSkills;

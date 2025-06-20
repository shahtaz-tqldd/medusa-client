"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

// components
import HeroText from "@/components/text/hero-text";
import ExperienceModal from "./experience-modal";
import ExperienceCard from "./experience-card";

// data
import { WORK_EXPERIENCES } from "./_data";
import type { ExperienceProps } from "./_types";

const Experiences: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expData, setExpData] = useState<ExperienceProps | null>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"],
  });

  // Changed to 0.85 as requested
  const progressHeight = useTransform(
    scrollYProgress,
    [0, 0.85],
    ["0%", "100%"]
  );

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const timelineRect = timelineRef.current.getBoundingClientRect();
      const timelineTop = timelineRect.top;
      const timelineHeight = timelineRect.height;
      const currentScrollProgress = scrollYProgress.get();

      // Adjust progress line position calculation for the new 0.85 limit
      const adjustedProgress = Math.min(currentScrollProgress / 0.85, 1);
      const progressLinePosition =
        timelineTop + adjustedProgress * timelineHeight;

      const newVisibleCards = new Set<number>();
      circleRefs.current.forEach((circleRef, index) => {
        if (circleRef) {
          const circleRect = circleRef.getBoundingClientRect();
          const circleCenter = circleRect.top + circleRect.height / 2;
          if (progressLinePosition >= circleCenter) {
            newVisibleCards.add(index);
          }
        }
      });

      setVisibleCards(newVisibleCards);
    };

    const handleScrollWithRAF = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", handleScrollWithRAF);
    const unsubscribe = scrollYProgress.onChange(handleScrollWithRAF);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScrollWithRAF);
      unsubscribe();
    };
  }, [scrollYProgress]);

  const setCardRef = (index: number) => (ref: HTMLDivElement | null) => {
    cardRefs.current[index] = ref;
  };

  const setCircleRef = (index: number) => (ref: HTMLDivElement | null) => {
    circleRefs.current[index] = ref;
  };

  return (
    <section className="container py-20 relative">
      <HeroText className="md:text-left text-center">Work Experiences</HeroText>
      <div className="mt-8 md:mt-20">
        <div className="relative" ref={timelineRef}>
          <div className="hidden md:block absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-white/10"></div>
          <motion.div
            className="hidden md:block absolute left-6 top-0 w-0.5 bg-gradient-to-b from-blue-600/80 to-blue-600"
            style={{ height: progressHeight }}
          ></motion.div>
          <div className="space-y-8 relative">
            <div className="hidden md:block bg-gradient-to-b dark:from-[#121212] from-white dark:to-black/0 to-white/0 h-20 w-0.5 absolute top-0 left-6"></div>
            {WORK_EXPERIENCES?.map((item, index) => (
              <div key={index} className="relative z-10" ref={setCardRef(index)}>
                <div
                  className="hidden md:block absolute left-[17px] top-1/2 -translate-y-1/2 z-10"
                  ref={setCircleRef(index)}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                      visibleCards.has(index)
                        ? "bg-blue-600 border-blue-600"
                        : "bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    <div
                      className={`w-full h-full rounded-full transition-all duration-300 ${
                        visibleCards.has(index)
                          ? "bg-white scale-40"
                          : "bg-transparent scale-0"
                      }`}
                    ></div>
                  </div>
                </div>
                <div className="md:ml-32">
                  <ExperienceCard
                    item={item}
                    setExpData={setExpData}
                    setIsOpen={setIsOpen}
                  />
                </div>
              </div>
            ))}
            <div className="hidden md:block bg-gradient-to-t dark:from-[#121212] from-white dark:to-black/0 to-white/0 h-20 w-0.5 absolute bottom-0 left-6"></div>
          </div>
        </div>
      </div>
      {isOpen && (
        <ExperienceModal data={expData} isOpen={isOpen} setIsOpen={setIsOpen} />
      )}

      <div className="absolute -right-72 -top-72 z-0 pointer-events-none">
        <Image
          src="/elipse_3.svg"
          height={800}
          width={800}
          alt="bg"
          className="opacity-30"
        />
      </div>
    </section>
  );
};

export default Experiences;

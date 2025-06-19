import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroText from "@/components/text/hero-text";
import { WORK_EXPERIENCES } from "./data";
import ExperienceModal from "./experience-modal";
import ExperienceCard from "./experience-card";

const Experiences = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expData, setExpData] = useState(null);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const timelineRef = useRef(null);
  const cardRefs = useRef([]);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"],
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const newVisibleCards = new Set();
      cardRefs.current.forEach((cardRef, index) => {
        if (cardRef) {
          const cardRect = cardRef.getBoundingClientRect();
          const cardMiddle = cardRect.top + cardRect.height / 2;

          if (cardMiddle <= window.innerHeight / 2) {
            newVisibleCards.add(index);
          }
        }
      });

      setVisibleCards(newVisibleCards);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const setCardRef = (index) => (ref) => {
    cardRefs.current[index] = ref;
  };

  return (
    <section className="container pb-32">
      <HeroText className="text-4xl text-center mb-4">
        Work Experiences
      </HeroText>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
        My professional journey in software development, from internship to
        current role
      </p>
      <div className="pl-10">
        <div className="relative" ref={timelineRef}>
          {/* Vertical Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-white/10"></div>

          {/* Progress Line */}
          <motion.div
            className="absolute left-6 top-0 w-0.5 bg-gradient-to-b from-blue-600/80 to-blue-600"
            style={{ height: progressHeight }}
          ></motion.div>

          <div className="space-y-8 relative">
            <div className="bg-gradient-to-b dark:from-black/90 from-white dark:to-black/0 to-white/0 h-20 w-0.5 absolute top-0 left-6"></div>
            {WORK_EXPERIENCES?.map((item, index) => (
              <div key={index} className="relative" ref={setCardRef(index)}>
                {/* Timeline Circle */}
                <div className="absolute left-[17px] top-1/2 -translate-y-1/2 z-10">
                  <div
                    className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${
                      visibleCards.has(index)
                        ? `${item.circleColor || "bg-blue-600 border-blue-600"}`
                        : "bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    {/* Inner dot for filled state */}
                    <div
                      className={`w-full h-full rounded-full transition-all duration-300 ${
                        visibleCards.has(index)
                          ? "bg-white scale-40"
                          : "bg-transparent scale-0"
                      }`}
                    ></div>
                  </div>
                </div>

                {/* Card with left margin for timeline */}
                <div className="ml-32">
                  <ExperienceCard
                    item={item}
                    setExpData={setExpData}
                    setIsOpen={setIsOpen}
                  />
                </div>
              </div>
            ))}
            <div className="bg-gradient-to-t dark:from-black/90 from-white dark:to-black/0 to-white/0 h-20 w-0.5 absolute bottom-0 left-6"></div>
          </div>
        </div>
      </div>

      {isOpen && (
        <ExperienceModal data={expData} isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </section>
  );
};

export default Experiences;

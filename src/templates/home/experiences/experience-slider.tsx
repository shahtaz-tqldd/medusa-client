"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Experience = {
  id: number;
  timeline: string;
  position: string;
  comapny: string;
  description: string;
};

export default function ExperienceSlider({
  experiences,
}: {
  experiences: Experience[];
}) {
  const [current, setCurrent] = useState(0);
  const totalSlides = 2; // manually set based on design
  const startX = useRef(0);
  const isDragging = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX;
    isDragging.current = true;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const diff = e.clientX - startX.current;
    if (diff < -50 && current < totalSlides - 1) {
      setCurrent((prev) => prev + 1);
    } else if (diff > 50 && current > 0) {
      setCurrent((prev) => prev - 1);
    }
    isDragging.current = false;
  };

  const cardWidth = 580; // fixed width for layout math
  const gap = 24; // tailwind gap-6 = 1.5rem = 24px

  return (
    <div className="w-full overflow-hidden">
      <div
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className="cursor-grab select-none relative "
      >
        <motion.div
          className="flex gap-6"
          animate={{ x: `-${current * (cardWidth + gap)}px` }}
          transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
          style={{ width: `${experiences.length * (cardWidth + gap)}px` }}
        >
          {experiences.map((item) => (
            <div
              key={item.id}
              className="w-[560px] shrink-0 border dark:border-white/20 dark:bg-white/[0.02] border-purple-500/20 border-dashed p-6 rounded-2xl"
            >
              <p className="dark:text-orange-300 text-orange-500">
                {item.timeline}
              </p>
              <h2 className="text-xl mt-4 font-medium">{item.position}</h2>
              <p className="opacity-75 mt-2 text-sm">{item.comapny}</p>
              <p className="opacity-60 mt-4">{item.description}</p>
            </div>
          ))}
        </motion.div>
        <div className="absolute right-0 top-0 w-[120px] h-full bg-gradient-to-l from-black/80 to-transparent pointer-events-none z-10" />
      </div>

      {/* Gradient peek on right */}

      {/* Bullets */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-colors duration-300",
              index === current
                ? "bg-purple-500"
                : "bg-white/30 hover:bg-white/60"
            )}
          />
        ))}
      </div>
    </div>
  );
}

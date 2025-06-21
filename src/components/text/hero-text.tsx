"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface HeroTextProps {
  children: string;
  className?: string;
  maxWidth?: string; // Add maxWidth prop for line breaking
}

const HeroText: React.FC<HeroTextProps> = ({
  children,
  className = "",
  maxWidth = "max-w-4xl", // Default max width
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(textRef, { once: true, margin: "-50px" });

  // Simple line splitting - split by sentences or manual line breaks
  const lines = children.split("\n").filter((line) => line.trim() !== "");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2, // Delay between lines
      },
    },
  };

  const lineVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    },
  };

  return (
    <div ref={textRef} className={maxWidth}>
      <motion.h2
        className={`leading-[32px] md:leading-[48px] text-2xl md:text-4xl font-medium mt-4 dark:text-gray-300 text-slate-800 ${className}`}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {lines.map((line: string, index: number) => (
          <motion.div
            key={index}
            variants={lineVariants}
            className="overflow-hidden"
          >
            <span className="inline-block">{line}</span>
          </motion.div>
        ))}
      </motion.h2>
    </div>
  );
};

export default HeroText;

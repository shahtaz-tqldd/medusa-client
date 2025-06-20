"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface HeroTextProps {
  children: string;
  className?: string;
}

const HeroText: React.FC<HeroTextProps> = ({ children, className = "" }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const words = children?.split(" ") ?? [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <motion.h2
      className={`leading-[32px] md:leading-[48px] text-2xl md:text-4xl font-medium mt-4 dark:text-gray-300 text-slate-800 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      {words.map((word: string, index: number) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.h2>
  );
};

export default HeroText;

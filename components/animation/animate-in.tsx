"use client";
import React, { ReactNode, useMemo, useRef } from "react";
import { motion, Variants, useInView } from "framer-motion";

const AnimateIn = ({
  children,
  index,
  className = "",
  down = false,
  overflowHidden = true,
  once = true,
  onAnimationComplete,
  onAnimationStart,
  id = "",
}: {
  children: ReactNode;
  index: number;
  className?: string;
  down?: boolean;
  overflowHidden?: boolean;
  once?: boolean;
  onAnimationComplete?: () => void;
  onAnimationStart?: () => void;
  id?: string;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once, margin: "-10% 10px" });

  const lineVariants: Variants = useMemo(
    () => ({
      hidden: { y: down ? "-100%" : "135%", opacity: 0 },
      visible: (i: number) => ({
        y: "0%",
        opacity: 1,
        transition: {
          delay: i * 0.15,
          duration: index === 0 ? 0.8 : 1.2,
          ease: index === 0 ? [0.6, 0.01, 0.05, 0.95] : [0.76, 0, 0.1, 1],
        },
      }),
    }),
    [down, index]
  );

  return (
    <div
      ref={ref}
      className={`${overflowHidden ? "overflow-hidden" : ""} ${className}`}
      {...(id && { id })}
    >
      <motion.div
        custom={index}
        variants={lineVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        onAnimationComplete={() => onAnimationComplete?.()}
        onAnimationStart={() => onAnimationStart?.()}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default AnimateIn;

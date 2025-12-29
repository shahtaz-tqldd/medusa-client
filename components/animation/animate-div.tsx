"use client";
import React, { ReactNode, useMemo, useRef } from "react";
import { motion, Variants, useInView } from "framer-motion";
import Image from "next/image";

type AnimateDivProps = {
  children: ReactNode;
  className?: string;
  down?: boolean;
  overflowHidden?: boolean;
  once?: boolean;
  stagger?: number;
  id?: string;
};

const AnimateDiv = ({
  children,
  className = "",
  down = false,
  overflowHidden = true,
  once = true,
  stagger = 0.15,
  id = "",
}: AnimateDivProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once, margin: "-10% 10px" });

  /* Parent */
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        when: "beforeChildren",
      },
    },
  };

  /* Slide-up animation (default) */
  const textVariants: Variants = useMemo(
    () => ({
      hidden: {
        y: down ? "-100%" : "135%",
        opacity: 0,
      },
      visible: (index: number) => ({
        y: "0%",
        opacity: 1,
        transition: {
          duration: index === 0 ? 0.8 : 1.2,
          ease: index === 0 ? [0.6, 0.01, 0.05, 0.95] : [0.76, 0, 0.1, 1],
        },
      }),
    }),
    [down]
  );

  /* Image animation */
  const imageVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1], // smooth, natural scale-in
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      {...(id && { id })}
      className={className}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return null;

        const isImage =
          typeof child.type === "string"
            ? child.type === "img"
            : child.type === Image;

        return (
          <div className={`${overflowHidden ? "overflow-hidden" : ""}`}>
            <motion.div
              variants={isImage ? imageVariants : textVariants}
              custom={!isImage ? index : undefined}
            >
              {child}
            </motion.div>
          </div>
        );
      })}
    </motion.div>
  );
};

export default AnimateDiv;

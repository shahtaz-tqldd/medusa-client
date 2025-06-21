"use client";

import React, { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface BodyTextProps {
  children: ReactNode;
  className?: string;
  animated?: boolean;
  delay?: number;
}

export default function BodyText({
  children,
  className = "",
  animated = false,
  delay = 0,
}: BodyTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const commonClasses = `text-slate-600 dark:text-gray-400 leading-relaxed ${className}`;

  if (animated) {
    return (
      <motion.p
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: delay, ease: [0.4, 0, 0.2, 1] }}
        className={commonClasses}
      >
        {children}
      </motion.p>
    );
  }

  return <p className={commonClasses}>{children}</p>;
}

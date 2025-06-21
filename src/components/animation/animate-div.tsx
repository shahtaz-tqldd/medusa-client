"use client";

import React, { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimateDivProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function AnimateDiv({
  children,
  className = "",
  delay = 0,
}: AnimateDivProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: delay, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

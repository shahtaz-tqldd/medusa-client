"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// types
import type { FeatureCardProps } from "./_types";

// components
import TextButton from "@/components/buttons/text-button";
import PrimaryCard from "@/components/cards/primary-card";
import TitleText from "@/components/text/title-text";
import BodyText from "@/components/text/body-text";

interface FeatureCardWithIndexProps extends FeatureCardProps {
  index: number;
}

const FeatureCard: React.FC<FeatureCardWithIndexProps> = ({
  data,
  handleFeatureOpen,
  index,
}) => {
  const { title, text, icon } = data;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1], // smooth cubic-bezier easing
      }}
    >
      <PrimaryCard className="h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
          className="flex flex-col justify-between gap-8 h-full"
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
            >
              <TitleText icon={icon}>{title}</TitleText>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.4, duration: 0.4 }}
            >
              <BodyText className="line-clamp-4">{text}</BodyText>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.1 + 0.5, duration: 0.3 }}
          >
            <TextButton onClick={() => handleFeatureOpen(data)}>
              Learn More
            </TextButton>
          </motion.div>
        </motion.div>
      </PrimaryCard>
    </motion.div>
  );
};

export default FeatureCard;

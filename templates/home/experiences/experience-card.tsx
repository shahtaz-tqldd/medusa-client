"use client";

import React, { useRef } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  Code,
  Building2,
  Zap,
  Dot,
  Check,
  ZapIcon,
  ArrowRight,
} from "lucide-react";
import { motion, useInView } from "framer-motion";

import type { ExperienceCardProps, ExperienceProps } from "./_types";
import { getDuration } from "@/lib/date";
import { Card } from "@/components/ui/card";
import { LabelText, Text } from "@/components/ui/typography";

interface ExperienceCardWithIndexProps extends ExperienceCardProps {
  index: number;
}

const ExperienceCard: React.FC<ExperienceCardWithIndexProps> = ({
  item,
  setIsOpen,
  setExpData,
  index,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  const handleReadMore = (data: ExperienceProps) => {
    setIsOpen(true);
    setExpData(data);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <Card className="md:p-8 rounded-3xl relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.1 }}
          className="grid lg:grid-cols-5 md:gap-6 gap-8 items-start"
        >
          {/* Left Column */}
          <div className="lg:col-span-3 space-y-4">
            <motion.div
              className="flex items-start gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              <div className={`${item.iconBg} p-3 rounded-2xl`}>
                <Building2 className={`w-6 h-6 ${item.companyColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl text-gray-900 dark:text-white/90">
                  {item.position}
                </h2>
                <p className={`${item.companyColor}`}>{item.company}</p>
              </div>
            </motion.div>

            <motion.div
              className="flex ml-16 flex-wrap gap-x-5 md:gap-x-8 gap-y-3 mt-3 text-sm text-blue-600 dark:text-blue-500"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <div className="flex items-center gap-1.5">
                <Calendar size={14} />
                <span>{item.timeline}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} />
                <span>{getDuration(item?.start_date, item?.end_date)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={14} />
                <span>{item.location}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: index * 0.1 + 0.4 }}
              className="ml-8 space-y-4"
            >
              {item.achievements?.map((a, i) => (
                <Text key={i} variant="sm" className="flex gap-2">
                  <Dot />
                  <span className="flex-1">{a}</span>
                </Text>
              ))}
            </motion.div>
          </div>

          {/* Right Column */}
          <motion.div
            className="md:col-span-2 flex flex-col justify-between h-full gap-6"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1 + 0.6 }}
          >
            <div className="space-y-4">
              <LabelText icon={ZapIcon} variant="xs">
                Highlights
              </LabelText>

              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {item.highlights.map((h, i) => (
                  <Text key={i} variant="xs" className="flx gap-2">
                    <Check size={14} className="text-emerald-500" />
                    {h}
                  </Text>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <LabelText icon={Code} variant="xs">
                Used Tech-stacks
              </LabelText>

              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-white/70 dark:bg-black/30 text-gray-600 dark:text-gray-400 rounded-lg text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => handleReadMore(item)}
              className="center bg-blue-500/10 text-blue-500 hover:bg-blue-500/15 hover:text-blue-400 font-semibold py-3 rounded-full tr"
            >
              <ArrowRight className="h-4 w-4 -rotate-45" />
              <span className="ml-4">View Details</span>
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.08 } : {}}
          transition={{ delay: index * 0.1 + 0.7, duration: 0.4 }}
          className="absolute top-0 right-0 z-0 pointer-events-none"
        >
          <Zap size={200} className="text-gray-400" strokeWidth={0.3} />
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default ExperienceCard;

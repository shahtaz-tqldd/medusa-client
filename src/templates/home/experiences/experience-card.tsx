"use client";

import React, { useRef } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  Code,
  Award,
  ChevronRight,
  Building2,
  Zap,
  Dot,
} from "lucide-react";
import { motion, useInView } from "framer-motion";

import PrimaryCard from "@/components/cards/primary-card";
import LabelText from "@/components/text/label-text";
import BodyText from "@/components/text/body-text";

import type { ExperienceCardProps, ExperienceProps } from "./_types";
import { getDuration } from "@/lib/date";

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
      <PrimaryCard className="md:p-8 rounded-3xl relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.1 }}
          className="grid lg:grid-cols-3 md:gap-6 gap-8 items-start"
        >
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-4">
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
              className="flex flex-wrap gap-x-5 md:gap-x-8 gap-y-3 mt-3 text-sm text-blue-600 dark:text-blue-400"
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
            >
              <div
                className="line-clamp-4 text-slate-600 dark:text-gray-400 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </motion.div>

            <motion.div
              className="flex flex-wrap mt-8 -ml-3 gap-x-5 md:gap-x-6 gap-y-2"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              {item.highlights.map((highlight, idx) => (
                <span key={idx} className="text-sm flx opacity-50">
                  <Dot />
                  {highlight}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right Column */}
          <motion.div
            className="flex flex-col justify-between h-full gap-6"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1 + 0.6 }}
          >
            <div className="space-y-6">
              <LabelText icon={Code}>Technologies</LabelText>

              <div className="flex flex-wrap gap-2">
                {item.technologies.slice(0, 4).map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-white/70 dark:bg-black/30 text-gray-600 dark:text-gray-400 rounded-lg text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
                {item.technologies.length > 4 && (
                  <span className="px-2 py-1 bg-white/70 dark:bg-black/30 text-gray-600 dark:text-gray-400 rounded-lg text-xs font-medium">
                    +{item.technologies.length - 4} more
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Award size={16} />
                <span className="block pt-0.5">
                  {item.achievements.length} Key Achievements
                </span>
              </div>
            </div>

            <button
              onClick={() => handleReadMore(item)}
              className={`group/btn flex items-center justify-center gap-2 px-6 py-3 ${item.iconBg} ${item.companyColor} rounded-xl font-medium border ${item.borderColor}`}
            >
              <span>View Details</span>
              <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
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
      </PrimaryCard>
    </motion.div>
  );
};

export default ExperienceCard;

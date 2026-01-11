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

import { getDuration } from "@/lib/date";
import { Card } from "@/components/ui/card";
import { LabelText, Text } from "@/components/ui/typography";
import AnimateDiv from "@/components/animation/animate-div";
import { Button } from "@/components/ui/button";
import { ExperienceProps } from "@/lib/api-service/experiences";
import moment from "moment";

interface ExperienceCardWithIndexProps {
  item: ExperienceProps;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setExpData: React.Dispatch<React.SetStateAction<ExperienceProps | null>>;
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

  const color = {
    bg: "bg-emerald-500/10",
    text: "text-emerald-600",
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
        <div className="grid lg:grid-cols-5 md:gap-6 gap-8 items-start">
          {/* Left Column */}
          <div className="lg:col-span-3 space-y-4">
            <AnimateDiv>
              <div className="flex items-start gap-4">
                <div className={`${color.bg} p-3 rounded-2xl`}>
                  <Building2 className={`w-6 h-6 ${color.text}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl text-gray-900 dark:text-white/90">
                    {item.position}
                  </h2>
                  <p className={`${color.text}`}>{item.company_name}</p>
                </div>
              </div>

              <div className="flex md:ml-16 flex-wrap gap-x-5 md:gap-x-8 gap-y-3 mt-3 text-xs md:text-sm text-emerald-600 dark:text-lime-400">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  <span>{moment(item.started_at).format("MMM YYYY")}</span>
                  {item.ended_at && (
                    <span> - {moment(item.ended_at).format("MMM YYYY")}</span>
                  )}
                </div>
                <div className="hidden md:flex items-center gap-1.5">
                  <Clock size={14} />
                  <span>
                    {getDuration(item?.started_at, item?.ended_at || undefined)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} />
                  <span>{item.company_location}</span>
                </div>
              </div>

              <div className="-ml-2 md:ml-8 mt-6 space-y-4">
                {item.key_contributions?.map((item, i) => (
                  <Text key={i} variant="sm" className="flex gap-2">
                    <Dot />
                    <span className="flex-1">{item}</span>
                  </Text>
                ))}
              </div>
            </AnimateDiv>
          </div>

          {/* Right Column */}
          <div className="md:col-span-2 flex flex-col justify-between h-full gap-6">
            <AnimateDiv className="h-full flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <LabelText icon={ZapIcon} variant="xs">
                  Highlights
                </LabelText>

                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {item.highlights.map((h, i) => (
                    <Text key={i} variant="sm" className="flx gap-2">
                      <Check size={14} className="text-emerald-500" />
                      {h}
                    </Text>
                  ))}
                </div>
              </div>

              <div className="hidden md:block space-y-4">
                <LabelText icon={Code} variant="xs">
                  Used Tech-stacks
                </LabelText>

                <div className="flex flex-wrap gap-y-2 gap-x-1">
                  {item.tech_stacks.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-white/70 dark:bg-black/30 text-gray-600 dark:text-gray-400 rounded-lg text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <Button
                variant="secondary"
                size="xl"
                onClick={() => handleReadMore(item)}
                className="w-full"
              >
                <ArrowRight className="h-4 w-4 -rotate-45" />
                View Details
              </Button>
            </AnimateDiv>
          </div>
        </div>

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

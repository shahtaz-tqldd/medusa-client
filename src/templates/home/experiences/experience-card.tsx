"use client";

import React from "react";
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
import { ExperienceProps } from "./_data";
import PrimaryCard from "@/components/cards/primary-card";
import LabelText from "@/components/text/label-text";
import BodyText from "@/components/text/body-text";

interface ExperienceCardProps {
  item: ExperienceProps;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setExpData: (data: ExperienceProps) => void;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  item,
  setIsOpen,
  setExpData,
}) => {
  const handleReadMore = (data: ExperienceProps) => {
    setIsOpen(true);
    setExpData(data);
  };

  return (
    <PrimaryCard className="md:p-8 rounded-3xl">
      <div className="grid lg:grid-cols-3 md:gap-6 gap-8 items-start">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-start gap-4">
            <div className={`${item.iconBg} p-3 rounded-2xl`}>
              <Building2 className={`w-6 h-6 ${item.companyColor}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl text-gray-900 dark:text-white/90 group-hover:dark:text-white dark:group-hover:text-gray-200 transition-colors">
                {item.position}
              </h2>
              <p className={`${item.companyColor}`}>{item.company}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-5 md:gap-x-8 gap-y-3 mt-3 text-sm text-blue-600 dark:text-blue-400">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} />
              <span>{item.timeline}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} />
              <span>{item.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin size={14} />
              <span>{item.location}</span>
            </div>
          </div>
        
          <BodyText>{item.description}</BodyText>
          

          {/* Highlights */}
          <div className="flex flex-wrap mt-8 -ml-3 gap-x-5 md:gap-x-8 gap-y-2">
            {item.highlights.map((highlight, idx) => (
              <span key={idx} className="text-sm flx opacity-50">
                <Dot />
                {highlight}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column - Technologies & Action */}
        <div className="flex flex-col justify-between h-full gap-6">
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
        </div>
      </div>

      <Zap
        size={200}
        className="text-gray-400 absolute top-0 right-0 z-0 opacity-3"
        strokeWidth={0.3}
      />
    </PrimaryCard>
  );
};

export default ExperienceCard;

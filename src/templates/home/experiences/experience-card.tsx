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
import { ExperienceProps } from "./constants";
import PrimaryCard from "@/components/cards/primary-card";

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
    <PrimaryCard className="p-8 rounded-3xl">
      <div className="grid lg:grid-cols-3 gap-6 items-start">
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
          <div className="flex flex-wrap gap-6 mt-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span className="block pt-0.5">{item.timeline}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span className="block pt-0.5">{item.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              <span className="block pt-0.5">{item.location}</span>
            </div>
          </div>

          <p className="text-sm opacity-70 leading-relaxed line-clamp-4">
            {item.description}
          </p>

          {/* Highlights */}
          <div className="flex flex-wrap gap-5 mt-8 -ml-3">
            {item.highlights.map((highlight, idx) => (
              <span key={idx} className="text-sm flex opacity-50">
                <Dot />
                {highlight}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column - Technologies & Action */}
        <div className="flex flex-col justify-between h-full">
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-3">
              <Code className={`w-5 h-5 ${item.companyColor}`} />
              <h4 className="font-medium opacity-80">Technologies</h4>
            </div>
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

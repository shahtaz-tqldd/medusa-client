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

const ExperienceCard = ({ item, setIsOpen, setExpData }) => {
  const handleReadMore = (data) => {
    setIsOpen(true);
    setExpData(data);
  };

  return (
    <div
      className={`relative group ${item.bgColor} ${item.borderColor} border-2 rounded-3xl p-8`}
    >
      <div className="grid lg:grid-cols-3 gap-6 items-start">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-start gap-4">
            <div className={`${item.iconBg} p-3 rounded-2xl`}>
              <Building2 className={`w-6 h-6 ${item.companyColor}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                {item.position}
              </h2>
              <p className={`text-lg font-semibold ${item.companyColor} mt-1`}>
                {item.company}
              </p>

              {/* Meta Information */}
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{item.timeline}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{item.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {item.description}
          </p>

          {/* Highlights */}
          <div className="flex flex-wrap gap-5 mt-5">
            {item.highlights.map((highlight, idx) => (
              <span key={idx} className="text-sm flx opacity-50">
                <Dot />
                {highlight}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column - Technologies & Action */}
        <div className="flex flex-col justify-between h-full">
          <div className="space-y-6 ">
            <div className="flex items-center gap-2 mb-3">
              <Code className={`w-5 h-5 ${item.companyColor}`} />
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Technologies
              </h4>
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
              <Award className="w-4 h-4" />
              <span>{item.achievements.length} Key Achievements</span>
            </div>
          </div>

          <button
            onClick={() => handleReadMore(item)}
            className={`group/btn flex items-center justify-center gap-2 px-6 py-3 ${item.iconBg} ${item.companyColor} rounded-xl font-medium  border ${item.borderColor}`}
          >
            <span>View Details</span>
            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Zap className="w-12 h-12 text-gray-400" />
      </div>
    </div>
  );
};

export default ExperienceCard;

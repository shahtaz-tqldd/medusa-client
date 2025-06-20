import React from "react";

import { FeatureProps } from "./types";

import TextButton from "@/components/buttons/text-button";
import PrimaryCard from "@/components/cards/primary-card";

interface FeatureCardProps {
  data: {
    title: string;
    text: string;
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  };
  handleFeatureOpen: (data: FeatureProps) => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  data,
  handleFeatureOpen,
}) => {
  const { title, text, icon: Icon } = data;

  return (
    <PrimaryCard>
      <div className="flex flex-col justify-between gap-8 h-full">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-500/10 dark:bg-white/5 p-2 rounded-xl">
              <Icon className="h-5 w-5 text-blue-500" strokeWidth={1.5} />
            </div>
            <h2 className="text-lg font-medium dark:text-gray-200 text-slate-800">
              {title}
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed line-clamp-4">
            {text}
          </p>
        </div>

        <TextButton onClick={() => handleFeatureOpen(data)}>
          Learn More
        </TextButton>
      </div>
    </PrimaryCard>
  );
};

export default FeatureCard;

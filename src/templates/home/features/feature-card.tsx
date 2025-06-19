import React from "react";
import SecondaryButton from "@/components/buttons/secondary-button";
import { FeatureProps } from "./types";
import { ChevronRightIcon } from "lucide-react";

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
    <div className="group relative p-6 border border-transparent dark:bg-white/[0.03] bg-blue-500/5 rounded-2xl tr hover:border-blue-500/20 border-dashed">
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 tr bg-blue-500/[0.02] pointer-events-none blur-sm z-0" />

      <div className="relative z-10 flex flex-col justify-between gap-8 h-full">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-500/10 dark:bg-white/5 p-2 rounded-xl">
              <Icon className="h-5 w-5 text-blue-500" strokeWidth={1.5} />
            </div>
            <h2 className="text-lg font-medium dark:text-gray-200 text-slate-800">
              {title}
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
            {text}
          </p>
        </div>

        <div className="mt-4">
          <button
            onClick={() => handleFeatureOpen(data)}
            className="dark:text-gray-400 text-gray-500 group/btn flx gap-1.5 hover:dark:text-blue-400 hover:text-blue-600"
          >
            Learn More
            <ChevronRightIcon size={16} className="group-hover/btn:translate-x-1 tr" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;

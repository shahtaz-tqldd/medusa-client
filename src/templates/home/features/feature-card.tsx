import React from "react";
import { ArrowRight } from "lucide-react";
import SecondaryButton from "@/components/buttons/secondary-button";

interface FeatureCardProps {
    data: {
      title: string;
      text: string;
      icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
    };
  }
  
const FeatureCard: React.FC<FeatureCardProps> = ({ data }) => {
    const {title, text, icon: Icon } =data
    const handleKnowDetails = (data)=>{
        console.log(data)
    }
    return (
        <div className="p-5 border border-dashed dark:border-white/10 border-violet-600/10 dark:bg-white/[0.01] bg-emerald-600/[0.02] rounded-2xl flex flex-col justify-between gap-8">
            <div>
                <div className="flx gap-2.5 mb-4">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                    <h2 className="text-lg font-semibold">{title}</h2>
                </div>
                <p className="opacity-60">{text}</p>
            </div>
            <SecondaryButton 
                onClick={()=>handleKnowDetails(data)} 
                className=""
            >
              Know Details
            </SecondaryButton>
        </div>
    );
};

export default FeatureCard;

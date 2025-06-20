import React from "react";

// types
import type { FeatureCardProps } from "./_types";

// compoennts
import TextButton from "@/components/buttons/text-button";
import PrimaryCard from "@/components/cards/primary-card";
import TitleText from "@/components/text/title-text";
import BodyText from "@/components/text/body-text";

const FeatureCard: React.FC<FeatureCardProps> = ({
  data,
  handleFeatureOpen,
}) => {
  const { title, text, icon } = data;

  return (
    <PrimaryCard>
      <div className="flex flex-col justify-between gap-8 h-full">
        <div>
          <TitleText icon={icon}>{title}</TitleText>
          <BodyText className="line-clamp-4">{text}</BodyText>
        </div>
        <TextButton onClick={() => handleFeatureOpen(data)}>
          Learn More
        </TextButton>
      </div>
    </PrimaryCard>
  );
};

export default FeatureCard;

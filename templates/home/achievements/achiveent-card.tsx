import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Text, Title } from "@/components/ui/typography";
import { AchievementProps } from "./_types";

interface AchievementCardProps {
  achievement: AchievementProps;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  return (
    <Card className="h-full">
      <div className="flex flex-col justify-between h-full">
        <div>
          {achievement.icon}
          <p
            className={`text-sm mt-4 font-medium ${achievement.accentColor} uppercase tracking-wide`}
          >
            {achievement.type}
          </p>
        </div>

        <Title variant="xs" className="mt-3">
          {achievement.title}
        </Title>

        <div className="mt-3 flex justify-between items-end">
          <div>
            {achievement.rating && (
              <h2
                className={`text-2xl font-bold ${achievement.accentColor} mt-2`}
              >
                {achievement.rating}
              </h2>
            )}
            {achievement.subtitle && (
              <Text variant="xs">{achievement.subtitle}</Text>
            )}
          </div>

          <Link
            href={achievement.link}
            target="__blank"
            className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/15 hover:text-blue-400 font-semibold py-2 px-4 text-xs rounded-full"
          >
            View
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default AchievementCard;

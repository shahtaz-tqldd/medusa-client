import React from "react";
import { Text, Title } from "@/components/ui/typography";
import { ACHIEVEMENTS } from "./_data";
import { Card } from "@/components/ui/card";

const Achievement = () => {
  return (
    <section className="container py-12 md:py-20">
      <div className="flex md:flex-row flex-col">
        <Title variant="lg">Achievements</Title>
      </div>
      <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ACHIEVEMENTS.map((achievement, index) => (
          <Card key={index}>
            <div className="flex flex-col h-full">
              <div className={`text-4xl mb-4 ${achievement.accentColor}`}>
                {achievement.icon}
              </div>
              <div className="flex-grow flex flex-col justify-between">
                <p
                  className={`text-sm font-medium ${achievement.accentColor} uppercase tracking-wide mb-2`}
                >
                  {achievement.type}
                </p>

                <h3 className="text-lg font-semibold mb-1">
                  {achievement.title}
                </h3>
                {achievement.issuer && (
                  <Text variant="sm" className="mt-3">
                    {achievement.issuer}
                  </Text>
                )}

                <div className="flex justify-between items-end">
                  {achievement.rating && (
                    <p
                      className={`text-2xl font-bold ${achievement.accentColor} mt-2`}
                    >
                      {achievement.rating}
                    </p>
                  )}
                  {achievement.subtitle && (
                    <Text variant="sm" className="mt-1">
                      {achievement.subtitle}
                    </Text>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Achievement;

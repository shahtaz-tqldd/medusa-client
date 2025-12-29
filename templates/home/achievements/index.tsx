import React, { useRef } from "react";
import { Text, Title } from "@/components/ui/typography";
import { ACHIEVEMENTS } from "./_data";
import { Card } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import AnimateDiv from "@/components/animation/animate-div";
import Link from "next/link";

const Achievement = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });
  return (
    <section className="container py-12 md:py-20">
      <div className="flex md:flex-row flex-col">
        <Title variant="lg">Achievements</Title>
      </div>
      <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ACHIEVEMENTS.map((achievement, index) => (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            key={index}
          >
            <Card className="h-full">
              <AnimateDiv className="flex flex-col justify-between h-full">
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
                    className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/15 hover:text-blue-400 font-semibold py-2 px-4 text-xs rounded-full tr"
                  >
                    View
                  </Link>
                </div>
              </AnimateDiv>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Achievement;

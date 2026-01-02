import { Title } from "@/components/ui/typography";
import AchievementSliderMobile from "./achievement-slider";
import { ACHIEVEMENTS } from "./_data";
import AchievementCard from "./achiveent-card";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Achievement = () => {
  return (
    <section className="container !py-6 md:!py-24">
      <Title variant="lg" className="text-center md:text-left">Achievements</Title>

      {/* Mobile slider */}
      <div className="mt-8 md:hidden">
        <AchievementSliderMobile />
      </div>

      {/* Desktop grid */}
      <AchievementGridDesktop />
    </section>
  );
};

export default Achievement;

const AchievementGridDesktop = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -100px 0px",
  });

  return (
    <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
      {ACHIEVEMENTS.map((achievement, index) => (
        <motion.div
          ref={ref}
          key={index}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: index * 0.1,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <AchievementCard achievement={achievement} />
        </motion.div>
      ))}
    </div>
  );
};

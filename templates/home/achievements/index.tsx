import { Title } from "@/components/ui/typography";
import AchievementSliderMobile from "./achievement-slider";
import { ACHIEVEMENTS } from "./_data";
import AchievementCard from "./achievement-card";
import ShinyText from "@/components/animation/shiny-text";
import Image from "next/image";

const Achievement = () => {
  return (
    <section className="container py-8 md:py-20 relative">
      <div className="z-10 relative">
        <div className="space-y-2">
          <ShinyText>Certifications</ShinyText>
          <Title variant="lg">Key Achievements</Title>
        </div>
        {/* Mobile slider */}
        <div className="mt-8 md:hidden">
          <AchievementSliderMobile />
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {ACHIEVEMENTS.map((achievement, index) => (
            <AchievementCard key={index} achievement={achievement} />
          ))}
        </div>
      </div>

      <div className="absolute -left-72 -top-72 z-0 pointer-events-none">
        <Image
          src="/elipse_1.svg"
          height={800}
          width={800}
          alt="bg"
          className="opacity-30"
        />
      </div>
    </section>
  );
};

export default Achievement;

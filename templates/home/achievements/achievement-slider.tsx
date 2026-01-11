import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import AchievementCard from "./achievement-card";
import { AchievementProps } from "@/lib/api-service/achievement";

const AchievementSliderMobile = ({
  achievements,
}: {
  achievements: AchievementProps[];
}) => {
  return (
    <Swiper
      modules={[Pagination]}
      spaceBetween={16}
      slidesPerView={1}
      pagination={{ clickable: true }}
      className="md:hidden"
    >
      {achievements.map((achievement, index) => (
        <SwiperSlide key={index} className="pb-8">
          <AchievementCard achievement={achievement} index={index} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default AchievementSliderMobile;

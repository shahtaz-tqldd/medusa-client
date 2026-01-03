import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { ACHIEVEMENTS } from "./_data";
import AchievementCard from "./achievement-card";

const AchievementSliderMobile = () => {
  return (
    <Swiper
      modules={[Pagination]}
      spaceBetween={16}
      slidesPerView={1}
      pagination={{ clickable: true }}
      className="md:hidden"
    >
      {ACHIEVEMENTS.map((achievement, index) => (
        <SwiperSlide key={index} className="pb-8">
          <AchievementCard achievement={achievement} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default AchievementSliderMobile;

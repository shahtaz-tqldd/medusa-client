"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

type Props = {
  images: Record<string, string | null>;
  name: string;
};

const ImageSlider: React.FC<Props> = ({ images, name }) => {
  const validImages = Object.entries(images).filter(([_, url]) => url !== null);

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev"
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 }
        }}
        className="rounded-2xl"
      >
        {validImages.map(([key, url], index) => (
          <SwiperSlide key={index}>
            <Image
              src={url as string}
              alt={`${name} screen - ${key}`}
              width={600}
              height={400}
              className="h-72 w-full object-cover rounded-2xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <div className="custom-prev absolute top-1/2 left-2 -translate-y-1/2 z-20 cursor-pointer rounded-full bg-black/40 p-1.5 hover:bg-black/60 transition">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      <div className="custom-next absolute top-1/2 right-2 -translate-y-1/2 z-20 cursor-pointer rounded-full bg-black/40 p-1.5 hover:bg-black/60 transition">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};

export default ImageSlider;
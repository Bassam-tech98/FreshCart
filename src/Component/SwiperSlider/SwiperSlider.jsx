import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper/modules";
import FreshCart from "/Images/FreshCart.jpg";
import Girl from "/Images/Girl.jpg";
import clothes from "/Images/clothes.jpg";
import Person from "/Images/Person.jpg";
export default function SwiperSlider() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: false,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            className="flex justify-center items-center w-[100%] h-[350px]"
            src={Girl}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="flex justify-center items-center w-[100%] h-[350px]"
            src={FreshCart}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="flex justify-center items-center w-[100%] h-[350px]"
            src={clothes}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="flex justify-center items-center w-[100%] h-[350px]"
            src={Person}
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}


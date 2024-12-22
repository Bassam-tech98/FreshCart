import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay} from "swiper/modules";
import BrandSlider from "../BrandSlider/BrandSlider";
export default function PopularBrandSlider() {

  const { data:PopularBrand } = useQuery({
    queryKey: ["brands"],
    queryFn: () => axios.get("https://ecommerce.routemisr.com/api/v1/brands"),
    select: (data) => data.data.data,
  });

    return (
      <>
        <div className="bg-colorbtn mt-4 ">
          <Swiper
            className="w-[100%] h-[100%] hover:cursor-pointer"
            slidesPerView={1}
            spaceBetween={10}
            breakpoints={{
              "@0.00": {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              "@0.75": {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              "@1.00": {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              "@1.50": {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
          >
            {PopularBrand?.map((CartBrand, index) => (
              <SwiperSlide
                key={index}
                className="text-center text-2xl
          flex justify-center items-cente"
              >
                <BrandSlider CartBrand={CartBrand} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </>
    );
   
};

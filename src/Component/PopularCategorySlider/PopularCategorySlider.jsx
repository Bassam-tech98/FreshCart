import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import CategorySlider from "../CategorySlider/CategorySlider";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export default function PopularCategorySlider() {
  const { data: PopularCatogery } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      axios.get("https://ecommerce.routemisr.com/api/v1/categories"),
    select: (data) => data.data.data,
  });

  return (
    <div className="bg-colorbtn mt-4">
      <Swiper
        slidesPerView={1} // عدد الشرائح في العرض الافتراضي
        spaceBetween={30}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        breakpoints={{
          640: { slidesPerView: 2 }, // عرض شريحتين للشاشات الصغيرة
          768: { slidesPerView: 3 }, // عرض ثلاث شرائح للشاشات المتوسطة
          1024: { slidesPerView: 4 }, // عرض أربع شرائح للشاشات الكبيرة
        }}
        className="mySwiper"
      >
        {PopularCatogery?.map((CartSlider, index) => (
          <SwiperSlide key={index} >
            <CategorySlider CartSlider={CartSlider} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

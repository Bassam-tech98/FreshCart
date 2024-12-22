import React, { useState } from "react";
import SwiperSlider from "../SwiperSlider/SwiperSlider";
import PopularCategorySlider from "../PopularCategorySlider/PopularCategorySlider";
import PopularBrandSlider from "../PopularBrandSlider/PopularBrandSlider";
import DisplayProduct from "../DisplayProduct/DisplayProduct";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export default function Home() {
  const [searsh, setsearsh] = useState("");
  const { data: productsData } = useQuery({
    queryKey: ["products"],
    queryFn: () => axios.get("https://ecommerce.routemisr.com/api/v1/products"),
    select: (data) => data.data.data,
  });

  // تصفية المنتجات بناءً على نص البحث
  const filteredProducts = productsData?.filter((product) =>
    product.title.toLowerCase().includes(searsh.toLowerCase())
  );

  return (
    <>
      <SwiperSlider />

      <h1 className="mt-10 font-bold text-2xl text-colororg ">
        Popular Categories:
      </h1>

      <PopularCategorySlider />
      <h1 className="mt-10 font-bold text-2xl text-colororg ">
        Popular Brands:
      </h1>
      <PopularBrandSlider />

      <div className="mt-8">
        <input
          type="text"
          className="bg-bgdroundcart focus:outline-none placeholder-colorwhite text-colorwhite mx-auto w-[50%] p-2 text-red-900 placeholder-white text-sm rounded-lg block"
          placeholder="Search Products..."
          value={searsh}
          onChange={(e) => setsearsh(e.target.value)}
        />
      </div>

      <div className=" pt-10 grid grid-cols-2 md:grid  md:grid-cols-3 lg:grid lg:grid-cols-4  gap-3">
        {filteredProducts?.length > 0 ? (
          filteredProducts?.map((product, index) => (
            <DisplayProduct key={index} product={product} />
          ))
        ) : (
          <div className="flex justify-center items-center">
            <h1 className="text-colororg text-2xl">Not Found Products</h1>
          </div>
        )}
      </div>
    </>
  );
}

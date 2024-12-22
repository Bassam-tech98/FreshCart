import React from "react";
import uniform from "/Images/uniform.jpg"; 
import { Link } from "react-router-dom";

export default function ProductSlider() {
  return (
    <div className="relative pb-8">
      <div className="flex justify-center">
        <img
          className="w-full h-[300px] object-cover rounded-md"
          src={uniform}
          alt="Uniform Cover"
        />
      </div>
      <div className="absolute inset-0 flex mt-[120px] flex-col justify-center items-center text-center">
        <h1 className="text-colorcover font-bold text-2xl">
          Discover Our Latest Products
        </h1>
        <p className="text-colorcover font-bold">
          Find the best deals on your favorite products. Shop now and enjoy
          exclusive discounts!
        </p>
        <Link
          to={"/Cart"}
          className="bg-colorbtn p-1 mt-4 rounded-lg text-colorwhite hover:bg-colororg transition-all duration-300"
        >
          Order Now
        </Link>
      </div>
    </div>
  );
}

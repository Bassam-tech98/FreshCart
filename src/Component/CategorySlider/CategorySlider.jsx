import React from "react";
import { Link } from "react-router-dom";

export default function CategorySlider({ CartSlider }) {
  return (
    <div className="rounded-md p-8">
      <div className="max-w-xs mx-auto md:max-w-md lg:max-w-lg">
        <div className="shadow-md rounded-lg overflow-hidden flex flex-col">
          <img
            className="hover:scale-105 transition-transform duration-300 object-cover w-full h-60 md:h-72 lg:h-80"
            src={CartSlider.image}
            alt="product image"
          />

          <div className="flex-grow flex items-center justify-center ">
            <h3 className="font-semibold text-center text-lg md:text-xl tracking-tight dark:text-colorred">
              {CartSlider.name}
            </h3>
          </div>
          <div className="text-center p-4">
            <Link
              to={`/CategoryDetails/${CartSlider._id}`}
              className="text-colorwhite bg-colordef hover:bg-colorwhite  hover:text-colornav focus:ring-4 focus:ring-blue-300 font-medium transition-all duration-200 rounded-lg text-sm px-4 py-2"
            >
              Show Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

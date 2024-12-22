import React from 'react'
import { Link } from 'react-router-dom';

export default function DisplayBrands({ brand }) {
    return (
      <div>
        <div className="max-w-2xl mx-auto ">
          <div className=" shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700 flex flex-col">
            <img
              className="hover:scale-105 duration-300 p-8 rounded-t-lg object-fill  "
              src={brand.image}
              alt="product image"
            />

            <div className="px-10 h-2/4 flex items-center justify-center">
              <h3 className="font-semibold text-center text-xl tracking-tight dark:text-colorred">
                {brand.name}
              </h3>
            </div>
            <div className="text-center text-colorwhite bg-colordef hover:bg-colorwhite hover:text-colornav focus:ring-4 focus:ring-blue-300 font-medium transition-all duration-200 rounded-lg text-sm px-5 py-2">
              <Link to={"/BrandsDetails/" + brand._id}>Show Products</Link>
            </div>
          </div>
        </div>
      </div>
    );
}

import React from 'react'
import { Link } from 'react-router-dom'

export default function DiscoverProducts() {
  return (
      <div className=" container   mt-[15px] mx-auto mb-[80px]   ">
          <div className=" bg-colororg   rounded w-[100%] h-48 opacity-45  text-center">
              <h1 className='text-[35px] text-colorwhite tracking-[10px] pb-4'>Discover Our Latest Products</h1>
              <p className="text-colorwhite mb-[30px] font-normal tracking-[4px] ">Find the best deals on your favorite products. Shop now and enjoy exclusive discounts!</p>
              <Link to={"/Cart"} className="bg-colornav  p-2 rounded  text-colorwhite hover:bg-colorbtn transition-all duration-200">Order Now</Link>

          </div>

      </div>
  )
}

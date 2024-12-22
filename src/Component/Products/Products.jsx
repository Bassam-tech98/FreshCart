import React, { useState } from 'react'
import axios from 'axios'
import DisplayProduct from '../DisplayProduct/DisplayProduct'
import { useQuery } from '@tanstack/react-query'
import ProductSlider from '../ProductSlider/ProductSlider'
import InputSearsh from '../InputSearsh/InputSearsh'

export default function Products() {

 const [searsh, setsearsh] = useState("");

    const { data:ProdctsData } = useQuery({
        queryKey: ['products'],
        queryFn: () => axios.get("https://ecommerce.routemisr.com/api/v1/products"),
        refetchOnReconnect: true,
        select: (data) => data.data.data
    });
  
  const filteredProducts = ProdctsData?.filter((product) =>
    product.title.toLowerCase().includes(searsh.toLowerCase()));
  
  return (
    <div>
      <ProductSlider />
      <div className="mt-8">
        <input
          type="text"
          value={searsh}
          className="bg-bgdroundcart focus:outline-none placeholder-colorwhite text-colorwhite mx-auto w-[50%] p-2 text-red-900 placeholder-white text-sm rounded-lg block"
          placeholder="Search Products..."
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
    </div>
  );
}
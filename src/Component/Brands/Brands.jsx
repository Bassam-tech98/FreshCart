import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import React from 'react'
import logoDiscover from '/Images/brand.png'
import DisplayBrands from '../DisplayBrands/DisplayBrands';
export default function Brands() {

  function GetAllBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }


  let { data } = useQuery({
    queryKey: ["brands"],
    queryFn: GetAllBrands,
    select: (data) => data.data.data,
  });

   


  return (
    <div>
      <div className="flex justify-center items-center pt-4 pb-10 rounded-md shadow-md">
        <img className='w-[100%] h-[100%]' src={logoDiscover} alt="DisCoverImage" />
      </div>

      <div className="grid grid-cols-2 md:grid md:grid-cols-3 lg:grid lg:grid-cols-4 gap-6">
        {data?.map((brand, index) => {
          return <DisplayBrands key={index} brand={brand} />;
        })}
      </div>
    </div>
  );
}

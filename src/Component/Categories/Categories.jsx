
import axios from 'axios'

import DesignLogo from "/Images/DesignLogo.jpg";
import { useQuery } from '@tanstack/react-query';
import DisplayCatogeries from '../DisplayCatogeries/DisplayCatogeries';
import { Link } from 'react-router-dom';

export default function Categories() {


  

 
 function GetAllCatogries() {
 return  axios.get("https://ecommerce.routemisr.com/api/v1/categories");
 
  }

  let { data } = useQuery({
    queryKey: ["categories"],
    queryFn: GetAllCatogries,
    select:(data)=>data.data.data
  });




  return (
    <>
      <div className="flex justify-center relative items-center pb-8 rounded-md overflow-hidden">
        <img
          className="w-full h-[350px] object-cover"
          src={DesignLogo}
          alt="imagecover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black bg-opacity-50">
          <h1 className="text-colorcover font-bold text-2xl md:text-3xl">
            Discover Our Latest Products
          </h1>
          <p className="text-colorcover font-bold text-sm md:text-lg px-4">
            Find the best deals on your favorite products. Shop now and enjoy
            exclusive discounts!
          </p>
          <Link
            to={"/Cart"}
            className="bg-colorbtn  p-1 rounded-lg text-colorwhite hover:bg-colororg transition-all duration-300"
          >
            Order Now
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid  md:grid-cols-3 lg:grid lg:grid-cols-4  gap-6">
        {data?.map((catogery, index) => {
          return <DisplayCatogeries key={index} catogery={catogery} />;
        })}
      </div>
    </>
  );
}

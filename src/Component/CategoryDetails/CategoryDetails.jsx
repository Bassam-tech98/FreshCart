import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DisplayCatogeryProducts from "../DisplayCatogeryProducts/DisplayCatogeryProducts";

export default function CategoryDetails() {
  let { id } = useParams();

  const [CategoryDetails, setCategoryDetails] = useState(null);

  useEffect(() => {
    GetCategoryDetails();
  }, []);

  async function GetCategoryDetails() {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`
    );

    setCategoryDetails(data.data);
  }


  const{data:catogeryproduct}=useQuery({
    queryKey: ["products"],
    queryFn: () => axios.get("https://ecommerce.routemisr.com/api/v1/products", {
      params: { category: id}
    }),
    select: (data) => data.data.data||[],
  });

  

  return (
    <div>
      <div className="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg  dark:bg-slate-800 shadow-md duration-300 ">
        <h2 className="mb-2 text-lg text-center font-semibold  text-colorred">
          {CategoryDetails?.name}
        </h2>
        <img
          className=" w-full object-cover p-8 object-center "
          src={CategoryDetails?.image}
          alt="Product Image"
        />
      </div>
      <h1 className="pt-8 text-colororg text-center text-2xl font-bold pb-8">
        Products in this Category
      </h1>
      {Array.isArray(catogeryproduct) && catogeryproduct.length > 0 ? (
        <div className="grid grid-cols-2 md:grid md:grid-cols-3 lg:grid lg:grid-cols-4 gap-6">
          {catogeryproduct?.map((caproduct, index) => {
            return (
              <DisplayCatogeryProducts key={index} caproduct={caproduct} />
            );
          })}
        </div>
      ) : (
        <h1 className="text-colororg items-center text-center text-2xl">
          No products available for this category.
        </h1>
      )}
    </div>
  );
}

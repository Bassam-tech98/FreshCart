import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import DisplayBrandProducts from "../DisplayBrandProducts/DisplayBrandProducts";

export default function BrandsDetails() {
  const { id } = useParams();

  const { data: brandData, isLoading: isLoadingBrand } = useQuery({
    queryKey: ["brand", id],
    queryFn: () =>
      axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`),
    select: (data) => data.data.data,
  });

  const { data: productsData, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["products", id],
    queryFn: () =>
      axios.get("https://ecommerce.routemisr.com/api/v1/products", {
        params: { brand: id },
      }),
    select: (data) => data.data.data || [],
  });

  if (isLoadingBrand || isLoadingProducts) {
    return <div>Loading...</div>; 
  }


  if (!productsData || !brandData) {
    return <div>No data available.</div>; 
  }

  return (
    <div>
      <h2 className="mb-2 text-lg font-semibold dark:text-white text-center text-colororg">
        {brandData.name}
      </h2>
      <div className="mx-auto pt-8 mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300">
        <img
          className="h-48 w-full object-cover p-8 object-center"
          src={brandData.image}
          alt="Brand Image"
        />
      </div>
      <h1 className="pt-8 text-colororg text-center text-2xl font-bold pb-8">
        Products in this Brand
      </h1>
      <div className="grid grid-cols-2 md:grid md:grid-cols-3 lg:grid lg:grid-cols-4 gap-6">
        {Array.isArray(productsData) && productsData.length > 0 ? (
          productsData.map((product, index) => (
            <DisplayBrandProducts key={index} brandproduct={product} />
          ))
        ) : (
          <h1 className="text-colororg  text-center text-2xl">No products available for this brand.</h1>
        )}
      </div>
    </div>
  );
}

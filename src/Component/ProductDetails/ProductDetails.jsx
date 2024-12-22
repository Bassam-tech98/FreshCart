import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Stars from '../Stars/Stars';
import Loading from '../Loading/Loading';
import ProductImageSlider from '../ProductImageSlider/ProductImageSlider';
import RelaredProducts from '../RelaredProducts/RelaredProducts';
import { AddProductToCart } from '../../CartServices';

export default function ProductDetails() {

    const { id } = useParams()
 
   const [ProductDetails, setProductDetails] = useState(null)
   const [isRelatedProducts,setRelatedProducts]=useState([])

    const [isloading, setloading] = useState(true)

    useEffect(() => {
        GetProductDetails()
    },[id])
    
    async function GetProductDetails() {
        setloading(true)
        let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products/"+ id)
        setProductDetails(data.data)
        RelatedProducts(data.data?.category._id)
        setloading(false)
    }
      async function RelatedProducts(categoryId) {
        
          let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products", {
            
              params: {
                  "category":categoryId
              }
              
        })
        
          setRelatedProducts(data.data)
      
    }


  return (

      <>
          {isloading ?<Loading/>:
                <div className="bg-colorwhite rounded">

    <main className="mt-[80px] p-[15px]">
        <div className="container mx-auto px-8  py-8">
            <div className="md:flex gap-20    md:items-center">
                <div className="w-full  h-64 md:w-3/12 lg:h-96">
                    <ProductImageSlider images={ProductDetails?.images}/>
                </div>
                <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-9/12">
                          <h3 className="text-colorcart uppercase text-lg">{ProductDetails?.title}</h3>
                          <p className="text-colorcart">{ProductDetails?.description }</p>
                          <span className="text-colorcart mt-3">${ProductDetails?.price}</span>
                          <Stars ratings={ProductDetails?.ratingsAverage} />
                    <hr className="my-3 text-colorcart"/>
                    <div className="mt-2">
                        <label className="text-colororg text-sm" for="count">Count:</label>
                        <div className="flex items-center mt-1">
                            <button className="text-colorcart focus:outline-none focus:text-gray-600">
                                <svg className="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </button>
                            <span className="text-colorcart text-lg mx-2">20</span>
                            <button className="text-colorcart focus:outline-none focus:text-gray-600">
                                <svg className="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </button>
                        </div>
                    </div>
                    <div className="mt-3">
                        <label className="text-colororg text-sm" >Category:</label>
                              <h3 className="text-colorcart">{ProductDetails?.category.name }</h3>

                        
                          </div>

                          <div className="mt-3">
                              <label className="text-colororg text-sm" >SubCategory:</label>
                              <h3 className="text-colorcart">{ProductDetails?.subcategory[0].name}</h3>


                          </div>

                          <div className="mt-3">
                              <label className="text-colororg text-sm" >Brands:</label>
                              <h3 className="text-colorcart">{ProductDetails?.brand.name}</h3>


                          </div>
                    <div className="flex items-center mt-6">
                        <Link to={"/Cart"} className="px-8 py-2 bg-indigo-600  text-sm font-medium rounded bg-colorbtn text-colorwhite hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">Order Now</Link>
                        <button onClick={()=>AddProductToCart(ProductDetails?._id)}  className="mx-2 text-colorwhite bg-colororg border rounded-md p-2 hover:bg-gray-200 focus:outline-none">
                            <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        </button>
                    </div>
                </div>
                          </div>
             <div>
                              
           <RelaredProducts Products={isRelatedProducts}  />
            </div>
        </div>
    </main>

   
</div >}

      
      
      
      
      
      </>

  )
}

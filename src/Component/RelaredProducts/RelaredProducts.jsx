import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { AddProductToCart } from '../../CartServices';
export default function RelaredProducts({Products}) {

    var settings = {
    dots: false,
    infinite: false,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 1
  };

  return (
    
      
      <div className="mt-16 ">
         
                <h3 className="text-colorblue text-2xl font-medium pb-4 underline">More Products</h3>
                
                       <Slider  {...settings}>
                     {Products.map((product,index) => (
                         <div  key={index}  className="p-2 rounded-md shadow-md max-w-sm w-full mx-auto hover:translate-y-1.5 duration-200 transition-all   ">
                          
                        <Link to={"/ProductDetails/"+product._id} className="flex items-end justify-end h-60  cursor-pointer bg-cover bg-center" style={{"background-image" : `url(${product.imageCover})`}}> 
                            <button onClick={()=>AddProductToCart(product._id)}  className="p-2 rounded-full bg-colororg text-colorwhite -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                                <svg className="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                            </button>
                        </Link>
                        <div className="px-5  ">
                                    
                                           <h3 className="text text-colornav line-clamp-1 uppercase">{ product.title}</h3>
                                  
                            <span className="text-colornav mt-2">${ product.price}</span>
                        </div>
                
                       
                   </div>
                          
               
                   )) }

               
                      </Slider>
          </div>
           
  )
}

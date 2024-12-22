import React from 'react'
import Stars from '../Stars/Stars'
import { Link } from 'react-router-dom'
import { AddProductToCart } from '../../CartServices'

export default function DisplayProduct({ product }) {
    

  return (
    <div className="max-w-2xl mx-auto   ">
      <div className="bg-colorbody  shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700 ">
        <Link to={"/ProductDetails/" + product._id}>
          <img
            className="hover:scale-105 duration-300    rounded-t-lg p-8"
            src={product.imageCover}
            alt="product image"
          />
        </Link>
        <div className="px-5 pb-5">
          <h3 className="font-semibold text-xl  tracking-tight dark:text-colorwhite line-clamp-1">
            {product.title}
          </h3>
          <p className="line-clamp-2 font-normal text-colorwhite">
            {product.description}
          </p>

          <Stars ratings={product.ratingsAverage} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-colorwhite">
            ${product.price}
          </span>
          <div className="relative ">
            <div className="absolute -top-12 right-2 text-2xl text-colorwhite hover:text-colordef ">
              <a href="">
                <i className="fa-solid fa-heart"></i>
              </a>
            </div>
            <button
              onClick={() => AddProductToCart(product._id)}
              className="text-colorwhite bg-colordef hover:bg-colorwhite  hover:text-colornav  focus:ring-4 focus:ring-blue-300 font-medium transition-all duration-200 rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

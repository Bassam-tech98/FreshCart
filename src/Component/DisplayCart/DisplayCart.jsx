import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function DisplayCart({ product, SetCart,cart }) {
    

  const [Increaseloading, SetIncreaseLoading] = useState(false);
  const [Decreaseloading, SetDecreaseloading] = useState(false);
  
        const[InputCount,SetInputCount]=useState(product.count);

  async function RemoveProductFromCart(productid) {
    let { data } = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/cart/" + productid,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    SetCart(data);
  }

  
  async function UpdateCart(productid, count) {
    
    if (count > product.count) {
      SetIncreaseLoading(true);
    } else {
      SetDecreaseloading(true);
    }
  
    let { data } = await axios.put("https://ecommerce.routemisr.com/api/v1/cart/" + productid, {
      count
    }, {
      headers: {
        token:localStorage.getItem("token")
      }
    });

    SetCart(data);
    
    SetIncreaseLoading(false);
    SetDecreaseloading(false)
  }

  useEffect(() => {
    SetInputCount(product.count)
  },[cart])

  return (
    <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
      <img
        src={product.product.imageCover}
        alt="product-image"
        className="w-full rounded-lg sm:w-40"
      />
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <h2 className="text-lg font-bold text-gray-900">
            {product.product.title}
          </h2>
          <p className="mt-1 text-xs text-gray-700">{product.price}</p>
        </div>
        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
          <div className="flex items-center bg-bgdroundcart">
            <button
              disabled={(product.count == 1 || Decreaseloading)}
              onClick={() => UpdateCart(product.product._id, product.count - 1)}
              className=" text-colorwhite cursor-pointer disabled:cursor-not-allowed rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
            >
              {Decreaseloading ? <i className="fas fa-spinner fa-spin" /> : "-"}
            </button>
            <input
              onBlur={() =>
                product.count != InputCount &&
                UpdateCart(product.product._id, InputCount)
              }
              onChange={(e) => SetInputCount(e.target.value)}
              className="h-8 w-8  bg-coloryello text-center text-xs outline-none"
              type="number"
              value={InputCount}
              min="1"
            />
            <button
              disabled={Increaseloading}
              onClick={() => UpdateCart(product.product._id, product.count + 1)}
              className=" text-colorwhite cursor-pointer disabled:cursor-not-allowed rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
            >
              {Increaseloading ? <i className="fas fa-spinner fa-spin" /> : "+"}
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-sm">{product.price * product.count}</p>
            <svg
              onClick={() => RemoveProductFromCart(product.product._id)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-5 w-5 cursor-pointer duration-150 hover:text-colorred"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DisplayCart from "../DisplayCart/DisplayCart";
import NotFoundCart from "../NotFoundCart/NotFoundCart";
import Loading from "../Loading/Loading";
import { useCart } from "../CartProvider/CartProvider";


export default function Cart() {
  let Tax = 10;

  const [cart, SetCart] = useState(null);
  
  const [isloading, setisloading] = useState(true);

  useEffect(() => {
    GetUserCart();
  }, []);

  async function GetUserCart() {
    setisloading(true);
    let { data } = await axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .finally(() => {
        setisloading(false);
      });

    SetCart(data);
  }

  function DeleteCart() {
    
    axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .finally(() => {
        SetCart(null);
      });
  }

  if (isloading) {
    return <Loading/>
  }

  return cart ? (
    <div className=" pt-20">
      <h1 className="mb-10 text-center text-2xl text-colororg font-bold">
        ItemsCart: ({cart?.numOfCartItems})
      </h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {cart?.data.products.map((product, index) => {
            return (
              <DisplayCart
                key={index}
                product={product}
                SetCart={SetCart}
                cart={cart}
              />
            );
          })}
        </div>

        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">${cart?.data.totalCartPrice}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">${Tax}</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">
                ${" "}
                {cart?.data.totalCartPrice
                  ? cart?.data.totalCartPrice + Tax
                  : 0}
              </p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
         
          <Link
            to={"/CheckOut/" + cart?.data._id}
            className="mt-6  w-full block text-center bg-colororg text-colorwhite rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
          >
            Check out (Pay With Visa)
          </Link>
        </div>
      </div>

      <button
        onClick={DeleteCart}
        className="bg-colorred mt-10 mx-auto block text-colorwhite border border-colorred p-2 rounded-md transition-all duration-200 hover:bg-colormsg hover:text-colorwhite hover:border-colormsg font-bold"
      >
        ClearCart
      </button>
    </div>
  ) : (
    <h1 className="p-8 font-bold text-center">
      <NotFoundCart />
    </h1>
  );
}

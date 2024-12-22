import React from "react";
import { useCart } from "../CartProvider/CartProvider";
import logo from "/Images/amazon.png";

export default function BascketCart() {
  const { cart } = useCart();

  return (
    <>
      <span className=" text-colorwhite   bottom-4 absolute">
        {cart?cart.numOfCartItems:0}
      </span>
      <img className="w-8 h-8" src={logo} alt="amazon.png" />
    </>
  );
}

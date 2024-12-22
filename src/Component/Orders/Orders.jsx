import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import noorder from "/Images/noorder.jpg";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { AthContext } from "../../Context/Context";
import Loading from "../Loading/Loading";
import DisplayOrder from "../DisplayOrder/DisplayOrder";
export default function Orders() {
  const { userToken } = useContext(AthContext);

  if (!userToken) return <div className="text-colororg text-2xl">Please log in to see your orders.</div>;
 
  let userId;
  try {
    const decodedToken = jwtDecode(userToken);
    userId = decodedToken.id;
  } catch (error) {
    return <div>Error decoding token: {error.message}</div>;
  }

  const GetAllOrders = (userId) => {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
    );
  };

  const { data:DataOrder, error, isLoading } = useQuery({
    queryKey: ["orders", userId],
    queryFn: () => GetAllOrders(userId),
    enabled: !!userId, // تأكد من وجود userId قبل إجراء الاستعلام
    select: (data) => data.data
  });

  if (isLoading) return <div><Loading/></div>;
  if (error) return <div>Error fetching orders: {error.message}</div>;

  return (
    <>
      {DataOrder && DataOrder.length > 0 ? (
        DataOrder.map((order) => <DisplayOrder key={order.id} order={order} />)
      ) : (
        <img className=" mx-auto w-[50%]" src={noorder} />
      )}
    </>
  );
}

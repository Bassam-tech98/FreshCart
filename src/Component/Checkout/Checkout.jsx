import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";

export default function CheckOut() {
  const [isloading, setisloading] = useState(false);
  const { cartId} = useParams();
   
  const initialValues = {
    details: "",
    phone: "",
    city: "",
  };

  const validationSchema = Yup.object({
    details: Yup.string().required("Details is required"),
    phone: Yup.string().required("phone is required"),
    city: Yup.string().required("city is required"),
  });

  let { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues,
      onSubmit,
      validationSchema,
    });

  async function onSubmit() {
    setisloading(true);

    axios.post( "https://ecommerce.routemisr.com/api/v1/orders/checkout-session/" + cartId,
        { shippingAddress: values },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
          params: {
            url: "http://localhost:5173",
          },
        }
      )
      .then(({ data }) => {
        setisloading(false);
        location.href = data.session.url;
      })
      .catch((err) => {
        setisloading(false);
      });
  }

  return (
    <>
      <div className="max-w-lg mx-auto  bg-colorwhite dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
        <h1 className="text-xl font-bold text-center text-gray-700 dark:text-colororg mb-8">
          Fill Shipping Address
        </h1>
        <form
          onSubmit={handleSubmit}
          action="#"
          className="w-full flex flex-col gap-4"
        >
          <div className="flex items-start flex-col justify-start">
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.details}
              type="text"
              name="details"
              className="w-full px-3 border-colorbtn dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your details"
            />
            {touched.details && errors.details && (
              <p className="text-colorred">{errors.details}</p>
            )}
          </div>
          <div className="flex items-start flex-col justify-start">
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phone}
              type="tell"
              name="phone"
              className="w-full px-3 border-colorbtn dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your phone"
            />
            {touched.phone && errors.phone && (
              <p className="text-colorred">{errors.phone}</p>
            )}
          </div>
          <div className="flex items-start flex-col justify-start">
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.city}
              type="text"
              name="city"
              className="w-full px-3 border-colorbtn dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your city"
            />
            {touched.city && errors.city && (
              <p className="text-colorred">{errors.city}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-colororg hover:bg-blue-600 text-colorwhite  font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-colornav"
            disabled={isloading}
          >
            CheckOut {isloading && <i className="fas fa-spinner fa-spin"></i>}
          </button>
        </form>
      </div>
    </>
  );
}

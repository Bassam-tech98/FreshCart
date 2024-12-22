import React, {  useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import * as Yup from 'yup'
import { useFormik } from 'formik'


export default function Register() {

  const [isloading, setisloading] = useState(false)
  const [issuccess, setissuccess] = useState("")
  const [iserror, setiserror] = useState("")
 

  const navigate = useNavigate();

  const initialValues = {
    "name": "",
      "email": "",
        "password": "",
          "rePassword": "",
            "phone": ""
  }

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").min(3, "Name least than 3 chrachter").max(20, "Name more than 20 chrachter"),
    email: Yup.string().required("Email is required").email("Email is in valid").matches(/\w+.?\d{3}@\w+.(com|info|org)/ig),
    password: Yup.string().required("password is required").matches(/\d{1,5}%-%\d{3,5}/ig),
    rePassword: Yup.string().required("repassword is required").oneOf([Yup.ref("password")]),
    phone:Yup.string().required("Phone is required")

  })
                
             const{handleSubmit,handleChange,handleBlur,values,touched,errors}=useFormik({
               
               initialValues,
               onSubmit,
               validationSchema,
                            })


  async function onSubmit() {
    setissuccess("")
    setiserror("")
    setisloading(true)
   await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values).then(({data}) => {
     setisloading(false)
     setissuccess(data.message)
     setTimeout(() => {
       navigate("/Login")
    },500)
      
   }).catch((error) => {
     setisloading(false)
     setiserror(error.response.data.message)
    
    })

                      
            }



  return (
    <div>
      <div className="max-w-lg mx-auto  bg-colorwhite dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
        <h1 className="text-xl font-bold text-center text-gray-700 dark:text-colororg mb-8">Welcome To Fresh Cart</h1>
        <form onSubmit={handleSubmit} action="#" className="w-full flex flex-col gap-4">
          <div className="flex items-start flex-col justify-start">

            <input onChange={handleChange} onBlur={handleBlur} value={values.name} type="text" name="name" className="w-full border-colorbtn px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder='Enter your name' />
            {touched.name && errors.name && <p className="text-colorred">{errors.name}</p>}
          </div>

          <div className="flex items-start flex-col justify-start">

            <input onChange={handleChange} onBlur={handleBlur} value={values.email} type="email" name="email" className="w-full px-3 border-colorbtn dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder='Enter your email' />
            {touched.email && errors.email && <p className="text-colorred">{errors.email}</p>}
          </div>

          <div className="flex items-start flex-col justify-start">
          
            <input onChange={handleChange} onBlur={handleBlur} value={values.password}  type="password"  name="password" className="w-full px-3 border-colorbtn dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder='Enter your password' />
            {touched.password && errors.password && <p className="text-colorred">{errors.password}</p>}
          </div>

          <div className="flex items-start flex-col justify-start">
           
            <input onChange={handleChange} onBlur={handleBlur} value={values.rePassword}  type="password"  name="rePassword" className="w-full px-3 border-colorbtn dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder='Enter your repassword ' />
            {touched.rePassword && errors.rePassword && <p className="text-colorred">{errors.rePassword}</p>}
          </div>

          <div className="flex items-start flex-col justify-start">
           
            <input onChange={handleChange} onBlur={handleBlur} value={values.phone}  type="tel"  name="phone" className="w-full px-3 border-colorbtn dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder='Enter your phone' />
            {touched.phone && errors.phone && <p className="text-colorred">{errors.phone}</p>}
          </div>

          
          <button type="submit" className="bg-colororg hover:bg-blue-600 text-colorwhite font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-colornav" disabled={isloading}>Register{isloading && <i className="fas fa-spinner fa-spin"></i>}</button>
          {issuccess && <p className="text-colormsg text-center font bold">{issuccess}</p>}
          {iserror && <p className="text-colorred text-center font-bold">{iserror}</p>}
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-500 dark:text-gray-300">Already have an account? </span>
          <Link to={"/Login"} className="text-colororg hover:text-blue-600">Login</Link>
        </div>
     
    </div>
    </div>
  )
}

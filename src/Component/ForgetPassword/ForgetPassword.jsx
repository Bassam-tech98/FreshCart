import React, { useContext, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { AthContext } from '../../Context/Context'

export default function ForgetPassword() {

    const [isloading, setisloading] = useState(false)
        const navigate=useNavigate()
    const [issuccess, setissuccess] = useState("")
    const [iserror, setiserror] = useState("")
    let { setuserToken } = useContext(AthContext)


    

    const initialValues = {
      
        "email": "",

    }

    const validationSchema = Yup.object({

        email: Yup.string().required("Email is required").email("Email is in valid"),
     
    })

    let { handleSubmit, handleChange, handleBlur, values, touched, errors } = useFormik({

        initialValues,
        onSubmit,
        validationSchema,
    })


    async function onSubmit() {
        setissuccess("")
        setiserror("")
        setisloading(true)
        await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values).then(({ data }) => {
            setisloading(false)
            setissuccess(data.message)
            
            navigate("/ResetCode")

        }).catch((error) => {
            
            
            setisloading(false)
            setiserror(error.response.data.message)

        })


    }

    return (
        <div>
            <div className="max-w-lg mx-auto  bg-colorwhite dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
                <h1 className="text-xl font-bold text-center text-gray-700 dark:text-colororg mb-8">Forget Password</h1>
                <form onSubmit={handleSubmit} action="#" className="w-full flex flex-col gap-4">

                    <div className="flex items-start flex-col justify-start">

                        <input onChange={handleChange} onBlur={handleBlur} value={values.email} type="email" name="email" className="w-full px-3 border-colorbtn dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder='Enter your email' />
                        {touched.email && errors.email && <p className="text-colorred">{errors.email}</p>}
                    </div>
                    <button type="submit" className="bg-colororg  text-center hover:bg-blue-600 text-colorwhite  font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-colornav" disabled={isloading}><i class="fa-solid fa-user-plus"></i>Send reset code {isloading &&  <i className="fas fa-spinner fa-spin"></i>}</button>
                    {issuccess && <p className='text-colorbtn text-center font-bold'>{issuccess}</p>}
                    {iserror && <p className='text-colorred text-center font-bold'>{iserror}</p>}
                </form>
            </div>
        </div>
    )
}

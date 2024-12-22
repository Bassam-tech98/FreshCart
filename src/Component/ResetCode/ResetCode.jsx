import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { AthContext } from '../../Context/Context'

export default function ResetCode() {


    const [isloading, setisloading] = useState(false)
    const [issuccess, setissuccess] = useState("")
    const [iserror, setiserror] = useState("")
    let { setuserToken } = useContext(AthContext)
         const  navigate=useNavigate()

    const initialValues = {

        "resetCode":""

    }

    const validationSchema = Yup.object({

        resetCode: Yup.string().required("resetCode is required"),


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
        await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values).then(({ data }) => {
            setisloading(false)
            setissuccess(data.message)
            navigate("/resetPassword")

        }).catch((error) => {
            setisloading(false)
            setiserror(error.response.data.message)

        })

    }


    return (
        <div>
            <div className="max-w-lg mx-auto  bg-colorwhite dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
                <h1 className="text-xl font-bold text-center text-gray-700 dark:text-colororg mb-8">Reset Code</h1>
                <form onSubmit={handleSubmit} action="#" className="w-full flex flex-col gap-4">

                    <div className="flex items-start flex-col justify-start">

                        <input onChange={handleChange} onBlur={handleBlur} value={values.resetCode} type="text" name="resetCode" className="w-full px-3 border-colorbtn dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder='Enter your code' />
                        {touched.resetCode && errors.resetCode && <p className="text-colorred">{errors.resetCode}</p>}
                    </div>

                    <button type="submit" className="bg-colororg text-center hover:bg-blue-600 text-colorwhite  font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-colornav" disabled={isloading}><i class="fa-solid fa-user-plus"></i> verify reset code {isloading && <i className="fas fa-spinner fa-spin"></i>}</button>
                    {issuccess && <p className='text-colorbtn text-center font-bold'>{issuccess}</p>}
                    {iserror && <p className='text-colorred text-center font-bold'>{iserror}</p>}
                </form>


            </div>
        </div>
    )
}
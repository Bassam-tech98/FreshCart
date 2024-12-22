import React, { useContext } from 'react'
import { AthContext } from '../../Context/Context'
import Login from '../Login/Login'

export default function ProductRoute({children}) {

   const { userToken }=useContext(AthContext)

  return (
      <>
      
      {
          userToken?children: <Login />
       }
      
      </>
    
  )
}

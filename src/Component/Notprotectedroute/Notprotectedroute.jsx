
import { AthContext } from '../../Context/Context'
import {  Navigate } from 'react-router-dom'
import { useContext } from 'react'

export default function Notprotectedroute({children}) {
    const { userToken } = useContext(AthContext)
    
  return (
      <>
          {
              
              !userToken ? children:<Navigate to={"/"}/>

      }
      
      
      </>
  )
}

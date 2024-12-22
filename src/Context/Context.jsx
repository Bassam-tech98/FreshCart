
import React from "react";
import { createContext,useState } from "react";


 export const AthContext = createContext();



export default function AthContextProvider({children}) {
    
    const [userToken, setuserToken] = useState(localStorage.getItem("token")??"")

  

    return (
      <AthContext.Provider value={{ userToken, setuserToken }}>
        {children}
      </AthContext.Provider>
    );



}




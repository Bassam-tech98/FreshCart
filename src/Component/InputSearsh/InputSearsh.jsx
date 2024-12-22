

import React from "react";

export default function InputSearch() {
 


  return (
    <div className="mt-8">
      <input
        type="text"
       
        className="bg-bgdroundcart focus:outline-none placeholder-colorwhite text-colorwhite mx-auto w-[50%] p-2 text-red-900 placeholder-white text-sm rounded-lg block"
        placeholder="Search Products..."
      />
    </div>
  );
}
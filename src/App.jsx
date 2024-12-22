import { createBrowserRouter,RouterProvider } from "react-router-dom"
import Layout from "./Component/Layout/Layout"
import Home from "./Component/Home/Home"
import Login from "./Component/Login/Login"
import Register from "./Component/Register/Register"
import Products from "./Component/Products/Products"
import Categories from "./Component/Categories/Categories"
import Brands from "./Component/Brands/Brands"
import Cart from "./Component/Cart/Cart"
import Notfound from "./Component/Notfound/Notfound"
import AthContextProvider from "./Context/Context"
import ForgetPassword from "./Component/ForgetPassword/ForgetPassword"
import ResetCode from "./Component/ResetCode/ResetCode"
import ProductRoute from "./Component/ProductRoute/ProductRoute"
import Notprotectedroute from "./Component/Notprotectedroute/Notprotectedroute"
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import ProductDetails from "./Component/ProductDetails/ProductDetails"
 import { ToastContainer} from 'react-toastify';
import CheckOut from "./Component/Checkout/Checkout"
import Orders from "./Component/Orders/Orders"
import {  Offline } from "react-detect-offline";
import CategoryDetails from "./Component/CategoryDetails/CategoryDetails"
import BrandsDetails from "./Component/BrandsDetails/BrandsDetails"
import { CartProvider } from "./Component/CartProvider/CartProvider"


function App() {

  const Router=createBrowserRouter([
            
    {
      path: '', element: <Layout />, children: [
      
        { index: true, element: <ProductRoute><Home /></ProductRoute>},
        { path: "/Login", element: <Notprotectedroute><Login /></Notprotectedroute> },
        { path: "/Register", element: <Notprotectedroute><Register /></Notprotectedroute>},
        { path: "/Products", element: <ProductRoute><Products /></ProductRoute> },
        { path: "/Categories", element: <ProductRoute><Categories /></ProductRoute> },
        { path: "/Brands", element: <ProductRoute> <Brands /></ProductRoute> },
        { path: "/Cart", element: <ProductRoute> <Cart /> </ProductRoute>},
        { path: "/ForgetPassword", element: <ForgetPassword /> },
        { path: "/ResetCode", element: <ResetCode /> },
        { path: "/CheckOut/:cartId", element: <ProductRoute><CheckOut /></ProductRoute> },
        { path: "/resetPassword", element: <resetPassword /> },
        { path: "/ProductDetails/:id", element: <ProductRoute><ProductDetails /></ProductRoute> },
        { path: "/CategoryDetails/:id", element: <ProductRoute><CategoryDetails /></ProductRoute> },
        {path:"/BrandsDetails/:id",element:<ProductRoute><BrandsDetails/></ProductRoute>},
        { path: "allorders", element: <ProductRoute><Orders /></ProductRoute> },
        { path: "*", element: <Notfound /> },

      ]}




          ])
     

  const queryclient = new QueryClient()
  
  
  

  return (
    <>
      <QueryClientProvider client={queryclient}>
        <AthContextProvider>
          <CartProvider>
            <RouterProvider router={Router}></RouterProvider>
            <ToastContainer />
            <Offline>
              <div className="bg-colorred text-colorwhite bottom-8 rounded-md p-4 fixed start-4">
                No Connection Internet
              </div>
            </Offline>
          </CartProvider>
        </AthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App
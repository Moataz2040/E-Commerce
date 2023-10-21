import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Cart from './Components/Cart/Cart'
import Products from './Components/Products/Products'
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx'
import NotFound from './Components/Notfond/Notfond'
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import CounterContextProvider from './Context/CounterContext'
import CartContextProvider from './Context/CartContext'
import { Toaster } from 'react-hot-toast';
import { Offline, Online } from "react-detect-offline";

function App() {

  const [userData,setUserData]=useState(null);

  useEffect(()=>{
  if (localStorage.getItem("userToken")) {
    saveUserData()
  }
  },[])

  function saveUserData() {
   let encodedToken = localStorage.getItem("userToken");
   let decoded = jwtDecode(encodedToken);
    setUserData(decoded);
  }




  const rootes = createBrowserRouter([
    {path:"",element:<Layout userData={userData} setUserData={setUserData}/>,children:[
  {index:true,element:
    <ProtectedRoutes>
  <Home/>
  </ProtectedRoutes>
},
  {path:"home",element:
  <ProtectedRoutes>
    <Home/>
  </ProtectedRoutes>
  },
  {path:"login",element:
  <Login saveUserData={saveUserData}/>
},
  {path:"register",element:
  <Register/>
},
  {path:"cart",element:
    <ProtectedRoutes>
  <Cart/>
  </ProtectedRoutes>
},
  {path:"products",element:
    <ProtectedRoutes>
  <Products/>
  </ProtectedRoutes>
},
// ( : ) to make id parameter متغير
  {path:"product-details/:id",element:
    <ProtectedRoutes>
  <ProductDetails/>
  </ProtectedRoutes>
},
  
  {path:"*",element:
  <NotFound/>
}
    ]}
  ])
  return<>
          <Offline><span className='network-status'> You are offline</span></Offline>
          <CartContextProvider>
            <CounterContextProvider>
            <Toaster />
                  <RouterProvider router={rootes}></RouterProvider>
            </CounterContextProvider>
        </CartContextProvider>
  </>
  
   
  
}

export default App;

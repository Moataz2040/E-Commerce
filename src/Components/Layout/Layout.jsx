import React from 'react'
import styles from'./Layout.module.css'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import {Outlet} from 'react-router-dom'
export default function Layout( {userData,setUserData}) {
  function logout(){
    localStorage.removeItem("userToken");
    setUserData(null);
  }
  return (
    <>
    <div className={styles.Layout}>
    <NavBar userData={userData} logout={logout}/>
    
    <Outlet/>
    
    <Footer/>
    </div>
    
    </>
  )
}

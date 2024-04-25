import React, { useContext, useEffect, useState } from 'react'
import styles from'./Cart.module.css'
import { CartContext } from '../../Context/CartContext'
import {Helmet} from "react-helmet";
import { Link } from 'react-router-dom';
export default function Cart() {
  let {getCart,updateCart,removeCartItem,setNumOfCartItems} =useContext(CartContext)
  let[cartDetails,setCartDetails]=useState();

  async function getCartDetails() {
   let res= await getCart()
   if (res.data) {
    console.log(res.data.data._id);
   setCartDetails(res.data);
   }
  }
  async function updateCartDetails(id,count) {
   let res= await updateCart(id,count)
   console.log(res);
   setCartDetails(res.data);
  }
  async function removeCartHandler(id) {
   let res= await removeCartItem(id)
   console.log(res);
   setCartDetails(res.data);
   setNumOfCartItems(res.data.numOfCartItems)
  }
  useEffect(()=>{
    getCartDetails()
},[])
  return (
    <>
     <Helmet>
                <meta charSet="utf-8" />
                <title>Shop Cart</title>
            </Helmet>
   
    {cartDetails? <div className={`container ${styles.allCart}`}>
      <div className="bg-light p-5 mt-5">
        <h3>Cart Details</h3>
      <h4>Total price :{cartDetails.data?.totalCartPrice}</h4>
      {cartDetails.data?.products.map((product)=><div key={product.product.id} className={`row border-bottom ${styles.borderColer} p-2`}>
        <div className="col-md-1">
          <img src={product.product.imageCover} className='w-100' alt="" />
        </div>
        <div className="col-md-11 d-flex justify-content-between">
          <div className="">
          <h4>{product.product.title}</h4>
          <p className='text-main'>{product.price} EGP</p>
          <button onClick={()=>removeCartHandler(product.product.id)} className="btn text-danger"><i className='fa fa-trash'></i> Remove</button>
          </div>
          <div className="d-flex align-items-center">
            <button className='btn btn-cart bg-main text-white' onClick={()=>updateCartDetails(product.product.id,product.count+1)}>+</button>
            <p className="mx-3 mb-0">{product.count}</p>
            <button className='btn btn-cart2 bg-danger text-white' onClick={()=>updateCartDetails(product.product.id,product.count-1)}>-</button>
          </div>
        </div>
      </div>)}
      <Link to={'/checkout'} className='btn btn-cart3 bg-main text-white mt-3'>procced to payment</Link>

      </div>
    </div> : `There is no cart`}
    </>
  )
}

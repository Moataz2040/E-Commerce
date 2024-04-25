import React, { useContext, useEffect, useState } from 'react'
import styles from'./FeatureProducts.module.css'
import axios from 'axios'
import Layout from '../Layout/Layout';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast  from 'react-hot-toast';

export default function FeatureProducts() {
  const [allProducts,setAllProducts]=useState([]);
  let {createCart,setNumOfCartItems}=useContext(CartContext)
  
  async function generateCart(productId) {
    let response = await createCart(productId)
    if(response.data.status == "success"){
      toast.success(response.data.message);
      setNumOfCartItems(response.data.numOfCartItems);
    }else{
      toast.error(response.data.message);
    }
  }
  async function getProducts() {
    const response = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      setAllProducts(response.data.data);
  }
  useEffect(()=>{
    getProducts()
  },[])
  return (
    <>
    <div className="container py-5">
      <div className="row">
        {allProducts?.map((product)=>(
          <div className="col-sm-4 col-md-3 col-lg-2 col-10 mx-auto" key={product.id}>
            <div className="product px-2 py-3">
              <Link className='productsLink' to={'/product-details/'+product.id}>
              <img src={product.imageCover} className='w-100' alt="" />
              <p className="text-main">{product.category.name}</p>
              <h3 className='h6'>{product.title.split(" ").splice(0,2).join(" ")}</h3>
              <div className="d-flex justify-content-between">
                <p>{product.price}EGP</p>
                <div>
                  <i className='fa fa-star rating'></i>
                  {product.ratingsAverage}
                </div>
              </div>
              </Link>
              <button onClick={()=>generateCart(product._id)} className='btn bg-main w-100 text-white'>+ Add</button>
            </div>
          </div>
        ))}
        
      </div>
      </div>
      </>
  )
}

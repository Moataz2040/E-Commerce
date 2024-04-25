import React, { useContext } from 'react'
import { useEffect, useState } from 'react'
import Slider from "react-slick";
import axios from 'axios';
import styles from'./ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext';
import toast  from 'react-hot-toast';
export default function ProductDetails() {
  let {createCart,setNumOfCartItems}=useContext(CartContext)

  async function generateProductDetails(productId) {
    let response = await createCart(productId)
    if(response.data.status == "success"){
      toast.success(response.data.message)
      setNumOfCartItems(response.data.numOfCartItems)
    }else{
      toast.error(response.data.message)
    }
  }
  let {id} = useParams()
  const [productDetails,setProductDetails]=useState({});
  async function getProductDetails() {
    const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    setProductDetails(response.data.data);
  }
  useEffect(()=>{
    getProductDetails()
  },[])

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <>
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-4">
          <Slider {...settings}>
            {/* very important optional parameter if images exist read it if not do not read images */}
      {productDetails.images?.map((img)=> <div>
              <img className='w-100' src={img} alt="" />
      </div>
)}
    </Slider>
        </div>
        <div className="col-md-8">
            <h1>{productDetails.title}</h1>
            <p>{productDetails.description}</p>
            <div className="d-flex justify-content-between">
                <p>{productDetails.price}EGP</p>
                <div>
                  <i className='fa fa-star rating'></i>
                  {productDetails.ratingsAverage}
                </div>
              </div>
              <button onClick={()=>generateProductDetails(productDetails.id)} className='btn bg-main w-100 text-white productDetailsButton'>+ Add</button>
          </div>
      </div>
    </div>
    </>
  )
}

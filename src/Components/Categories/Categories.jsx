import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import styles from'./Categories.module.css'
import axios from 'axios';
export default function Categories() {
  const [allCategories,setAllCategories]=useState([]);
  async function getCategories() {
    const response = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      setAllCategories(response.data.data);
  }
  useEffect(()=>{
    getCategories()
  },[])
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <>
    <Slider {...settings} >
      {allCategories?.map((category)=><div key={category._id} className=''>
        <img className={styles.category} src={category.image} alt="" />
        <h3 className="h6">{category.name}</h3>
      </div>)}
    </Slider>
    </>
  )
}

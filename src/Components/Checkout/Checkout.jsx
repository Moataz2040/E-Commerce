import React, { useContext, useEffect, useState } from 'react'
import styles from'./Checkout.module.css'
import axios from 'axios';
import { Field, Form, Formik, useFormik } from 'formik'
import { CartContext } from '../../Context/CartContext';
export default function Checkout() {
  let [cities,setcities] = useState()
  let {generateOnlinePayment,cartId} = useContext(CartContext);
  async function handelPayment(values){
    console.log(values);
    let {data} =  await generateOnlinePayment(cartId,values);
    if (data.session) {
      // to go to outsite link we use (window.location.href)
      window.location.href = data.session.url;
    }
  }
  // async function allCountries() {
  //   let headers= {
  //     'X-CSCAPI-KEY':'RVg2MnZpZE9CZU5OeXhFcWRVN1Zudm94c2J2b1oyUEFlalpqeTE2UQ=='
  //   }
  //   let res = await axios.get(`https://api.countrystatecity.in/v1/countries`,
  //   {
  //     headers
  //   }
  //   ).catch((err)=>console.log(err))
  //   setCountries(res.data)
  // }
  async function allCities() {
    let headers= {
      'X-CSCAPI-KEY':'RVg2MnZpZE9CZU5OeXhFcWRVN1Zudm94c2J2b1oyUEFlalpqeTE2UQ=='
    }
    let res = await axios.get(` https://api.countrystatecity.in/v1/states`,
    {
      headers
    }
    ).catch((err)=>console.log(err))
    setcities(res.data)
  }
  useEffect(()=>{
    allCities()
  })
  return (
    <>
    <div className="container">
      <Formik
      initialValues={
       { details:'',
        phone:'',
        city:''}
      }
      onSubmit={(value)=>(handelPayment(value),allCities())}
      >
      <Form  className='w-75 mx-auto my-5'>
      <label htmlFor="details">Details</label>
      <Field type="text" className='form-control mb-3' name='details' id='details'  />
      <label htmlFor="phone">Phone</label>
      <Field type="tel" className='form-control mb-3' name='phone' id='phone'  />
      <label htmlFor="city">City</label>
      {/* very important information ****
        <input list="browsers">
  <datalist id="browsers">
    <option value="Edge">
    <option value="Firefox">
    <option value="Chrome">
    <option value="Opera">
    <option value="Safari">
  </datalist>
  blow i just replace input with Field 
       */}
      <Field type= 'text' className='form-control mb-3' name='city' list='city' />
      <datalist id='city'>
      <option value="">select</option>
      {cities?.map((country)=>(
      <option value={`${country.name}`} key={country.id}>{country.name}</option>
      ))}
      </datalist>
      <button type='submit' className='btn btn-outline-info w-100'>Pay</button>
    </Form>
    </Formik>
    </div>
    </>
  )
}

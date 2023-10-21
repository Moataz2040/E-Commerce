import React from 'react'
import  { useState } from 'react'
import { Formik, useFormik } from 'formik'
import axios from 'axios'
import styles from'./Login.module.css'
import { useNavigate } from 'react-router-dom';
export default function Login({saveUserData}) {
  const [isLoading,setIsLoading]=useState(false);
  const [errMessage,setErrMessage]=useState(null);
  const navigate = useNavigate();
   async function login(values) {
    setIsLoading(true);
    setErrMessage(null);
    let responce = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values).catch((err=>{
      setErrMessage(err.response.data.message)
      setIsLoading(false);
    }))
    if(responce && responce.data ){
      if (responce.data.message === "success") {
        setIsLoading(false)
        localStorage.setItem("userToken",responce.data.token);
        saveUserData()
        navigate('/')
      }
    }
  }

  function validate(values) {
    let errors={};
    if (!values.email) {
      errors.email="Required"
    }else if( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
      errors.email="Invalid email address"
    }
    if (!values.password) {
      errors.password="Required"
    }else if( !/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/.test(values.password)){
      errors.password="Password have capital and number"
    }
    return errors
  }
  let formik = useFormik({
    initialValues:{
    email:"",
    password:""
    },
    validate,
    onSubmit:(values)=>{login(values)}
  })
  return (
    <>
    
    <div className="container my-5">
      <h3 className='mb-5'>Login Now :</h3>
      {errMessage? <div class="alert alert-danger">{errMessage}</div> : ''}
      <form onSubmit={formik.handleSubmit} className='w-75 mx-auto'>
      <label htmlFor="email">Email</label>
      <input type="email" className='form-control mb-2' id='email'
      name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : ""}


      <label htmlFor="password">Password</label>
      <input type="password" className='form-control mb-2' id='password'
      name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : ""}

      {isLoading? <button type='submit' className={`btn main-bg text-white`} id={`${styles.load}`}><i className='fa fa-spin fa-spinner '></i></button> : <button type='submit' className={`btn main-bg text-white`} id={`${styles.btn}`}>Login</button>}
      
      </form>
      
    </div>
    </>
  )
}

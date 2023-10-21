import React from 'react'
import { useState } from 'react'
import { Formik, useFormik } from 'formik'
import axios from 'axios'
import styles from'./Register.module.css'
import { useNavigate } from 'react-router-dom';
export default function Register() {
  const [isLoading,setIsLoading]=useState(false);
  const [errMessage,setErrMessage]=useState(null);
  const navigate = useNavigate();
   async function register(values) {
    setIsLoading(true);
    setErrMessage(null);
    let responce = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values).catch((err=>{
      setErrMessage(err.response.data.message)
      setIsLoading(false);
    }))
    if(responce && responce.data ){
      if (responce.data.message === "success") {
        setIsLoading(false)
        navigate('/login')
      }
    }
  }

  function validate(values) {
    let errors={};
    if (!values.name) {
      errors.name="Required"
    }else if(values.name.length < 3 ){
      errors.name="Must be more than 3 char"
    }
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
    if (!values.rePassword) {
      errors.rePassword="Required"
    }else if( values.rePassword !== values.password){
      errors.rePassword="confirmPassword must match password"
    }
    if (!values.phone) {
      errors.phone="Required"
    }else if( !/^01[0125][0-9]{8}$/.test(values.phone)){
      errors.phone="invalid phone"
    }
    return errors
  }
  let formik = useFormik({
    initialValues:{
    name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:""
    },
    validate,
    onSubmit:(values)=>{register(values)}
  })
  return (
    <>
    
    <div className="container my-5">
      <h3 className='mb-5'>Register Now :</h3>
      {errMessage? <div class="alert alert-danger">{errMessage}</div> : ''}
      <form onSubmit={formik.handleSubmit} className='w-75 mx-auto'>
        <label htmlFor="name">Name</label>
      <input type="text" className='form-control mb-2' id='name' 
      name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.name && formik.touched.name ? <div className="alert alert-danger">{formik.errors.name}</div> : ""}

      <label htmlFor="email">Email</label>
      <input type="email" className='form-control mb-2' id='email'
      name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : ""}


      <label htmlFor="password">Password</label>
      <input type="password" className='form-control mb-2' id='password'
      name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : ""}

      
      <label htmlFor="rePassword">rePassword</label>
      <input type="password" className='form-control mb-2' id='rePassword'
      name='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger">{formik.errors.rePassword}</div> : ""}

      
      <label htmlFor="phone">Phone</label>
      <input type="tel" className='form-control mb-2' id='phone'
      name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger">{formik.errors.phone}</div> : ""}
      
      {isLoading? <button type='submit' className={`btn main-bg text-white`} id={`${styles.load}`}><i className='fa fa-spin fa-spinner '></i></button> : <button type='submit' disabled={!(formik.isValid && formik.dirty)} className={`btn main-bg text-white`} id={`${styles.btn}`}>Register</button>}
      
      </form>
      
    </div>
    </>
  )
}

import React, { useContext } from 'react'
import styles from'./NavBar.module.css'
import {Link} from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { CartContext } from '../../Context/CartContext'
export default function NavBar({userData,logout}) {
  let {numOfCartItems} = useContext(CartContext);
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-dark navbar-dark">
  <div className="container">
    <a className="navbar-brand" href="#"><img src={logo} className='nav-image' alt="nnnn" /></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {userData && <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to=''>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='products'>Products</Link>
        </li>
      </ul>}
      
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {userData? <>
          <li className="nav-item">
          <Link className="nav-link cursor-pointer" to='login' onClick={logout}>Logout</Link>
        </li>
        <li className="nav-item position-relative">
        <Link className="nav-link" to='cart'>
          <i className="fa-solid fa-cart-shopping fa-lg"></i>
          <div className="badge bg-main position-absolute top-0 end-0">{numOfCartItems}</div>
        </Link>
      </li> 
        </>
      :<>
        <li className="nav-item">
          <Link className="nav-link" to='login'>Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='register'>Register</Link>
        </li>
        </>}
      </ul>
    </div>
  </div>
</nav>
    </>
  )
}

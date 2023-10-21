import axios from "axios";
import { createContext, useState } from "react";



export let CartContext = createContext(0);

export default function CartContextProvider(props) {

     function createCart(productId) {
        return axios.post('https://ecommerce.routemisr.com/api/v1/cart',{productId:productId},
        {
            headers:{
                token:localStorage.getItem("userToken")
            },
        }).then(res => res).catch(err => err)
    }
     function getCart() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart',
        {
            headers:{
                token:localStorage.getItem("userToken")
            },
        }).then(res => res).catch(err => err)
    }
     function updateCart(id,count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count:count},
        {
            headers:{
                token:localStorage.getItem("userToken")
            },
        }).then(res => res).catch(err => err)
    }
     function removeCartItem(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
            headers:{
                token:localStorage.getItem("userToken")
            },
        }).then(res => res).catch(err => err)
    }
    let[cart,setCart]=useState();
    return <CartContext.Provider value={{cart,createCart,getCart,updateCart,removeCartItem}}>
        {props.children}
    </CartContext.Provider>
}
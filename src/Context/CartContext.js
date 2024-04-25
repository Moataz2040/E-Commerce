import axios from "axios";
import { createContext, useEffect, useState } from "react";


export let CartContext = createContext(0);

export default function CartContextProvider(props) {

    let [numOfCartItems,setNumOfCartItems] =useState(0);
    let [cartId,setCartId] =useState(null);


    useEffect(()=>{
        getIntialValues()
    })
    
    async function getIntialValues() {
    let {data} = await getCart();
    if (data?.status == "success") {
        setNumOfCartItems(data.numOfCartItems);
        setCartId(data.data._id);
    }
    }
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
     function generateOnlinePayment(cartId , shippingAddress) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        {
            shippingAddress
        },
        {
            headers:{
                token:localStorage.getItem("userToken")
            },
        }).then(res => res).catch(err => err)
    }
    let[cart,setCart]=useState();
    return <CartContext.Provider value={{cart,createCart,getCart,updateCart,removeCartItem,generateOnlinePayment,setNumOfCartItems,numOfCartItems,cartId}}>
        {props.children}
    </CartContext.Provider>
}
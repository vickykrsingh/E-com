import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import toast from 'react-hot-toast'
import axios from "axios";

function AddToCart({ product , width , height }) {
  const [cart,setCart] = useCart();
  const [fire,setFire] = useState(false)

  const getAllCart = async () => {
    try {
      const {data} = await axios.get('/api/v1/cart/get-all-cart')
      // await setCart(data?.cartItem)
      return
    } catch (error) {
      toast.error('request timeout while getting all product')
    }
  }

  const handleCart = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/v1/cart/add-to-cart`,{
        _id:product._id,
        category:product.category,
        name:product.name,
        description:product.description,
        price:product.price,
        quantity:product.quantity,
        shipping:product.shipping,
        slug:product.slug,
      })
      if(data?.success){
        getAllCart()
        toast.success('Added to cart Successfully')
      }

    } catch (error) {
      toast.error("Timeout while adding product in your cart")
    }
  };


  return (
    <button
      onClick={(e) => {handleCart(e); setFire(true)}}
      className={`btn btn-sm cart-btn px-${width} py-${height}`}
      style={{border:'2px solid #7f8fa6'}}
    >
      ADD TO CART
    </button>
  );
}

AddToCart.defaultProps={
  width:3,
  height:1
}

export default AddToCart;

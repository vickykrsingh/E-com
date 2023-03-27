import React from "react";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";

function AddToCart({product}) {
  // const navigate = useNavigate();
  const [cart,setCart] = useCart()
  const handleCart = (e) => {
    e.preventDefault();
    try {
      setCart([...cart,product])
      toast.success('Added to cart Successfully')
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <button onClick={(e)=>{
      e.preventDefault()
      handleCart(e)
    }} className="btn btn-sm btn-secondary W-50">ADD TO CART</button>
  )
}

export default AddToCart;

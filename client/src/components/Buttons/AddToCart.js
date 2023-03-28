import React, { useEffect } from "react";
import { useCart } from "../../context/CartContext";

function AddToCart({ product }) {
  const [cart, setCart] = useCart();
  const handleCart = async (e) => {
    e.preventDefault();
    try {
      await setCart([...cart, product]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <button
      onClick={(e) => handleCart(e)}
      className="btn btn-sm btn-secondary W-50"
    >
      ADD TO CART
    </button>
  );
}

export default AddToCart;

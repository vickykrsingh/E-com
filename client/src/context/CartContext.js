import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const getAllCart = async () => {
    try {
      const {data} = await axios.get('/api/v1/cart/get-all-cart')
      setCart(data.cartItem)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getAllCart()
  },[])

  return (
    <CartContext.Provider value={[cart, setCart , getAllCart]}>
      {children}
    </CartContext.Provider>
  );
};
const useCart = () => useContext(CartContext);
export { useCart, CartProvider };

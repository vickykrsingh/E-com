import React from "react";
import { useNavigate } from "react-router-dom";
import { axios } from "axios";

function AddToCart(props) {
  const navigate = useNavigate();

  return <button className="btn btn-sm btn-secondary W-50">ADD TO CART</button>;
}

export default AddToCart;

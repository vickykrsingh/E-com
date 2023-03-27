import React from "react";
import { useNavigate } from "react-router-dom";
function SeeMore({pId,cId}) {
  const navigate = useNavigate();
  const handleProductDetail = async (e) => {
    e.preventDefault();
    try {
      navigate(`/product-detail/${pId}/${cId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      className="btn btn-sm btn-secondary W-50 ms-2"
      onClick={(e) => {
        e.preventDefault()
        handleProductDetail(e);
      }}
    >
      SEE MORE
    </button>
  );
}

export default SeeMore;

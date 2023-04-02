import React from "react";
import { useNavigate } from "react-router-dom";
function SeeMore({ pId, cId , width , height}) {
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
      className={`btn btn-sm seeMore-btn ms-2 px-${width} py-${height}`}
      style={{border:'2px solid #7f8fa6'}}
      onClick={(e) => {
        e.preventDefault();
        handleProductDetail(e);
      }}
    >
      SEE MORE
    </button>
  );
}

SeeMore.defaultProps={
  width:4,
  height:1
}

export default SeeMore;

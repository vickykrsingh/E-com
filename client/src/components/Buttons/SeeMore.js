import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDetail } from "../../context/ProductDetail";
// import { useParams } from 'react-router-dom'
function SeeMore(props) {
  const navigate = useNavigate();
  const [detail, setDetail] = useDetail();
  // const params = useParams()
  const handleProductDetail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${props.pId}`
      );
      await setDetail(data?.product);
      navigate(`/product-detail/${data.product._id}`);
      // console.log(params);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      className="btn btn-sm btn-secondary W-50 ms-2"
      onClick={(e) => {
        handleProductDetail(e);
      }}
    >
      SEE MORE
    </button>
  );
}

export default SeeMore;

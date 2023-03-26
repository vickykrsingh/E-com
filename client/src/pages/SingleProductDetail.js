import React, { useEffect, useState } from "react";
import AddToCart from "../components/Buttons/AddToCart";
import Layout from "../components/Layout/Layout";
import { useDetail } from "../context/ProductDetail";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./../components/Loading.js";

function SingleProductDetail() {
  const [detail, setDetail] = useDetail();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const myFun = async () => {
    setLoading(true);
    const { data } = await axios.get(`/api/v1/product/get-product/${id}`);
    setLoading(false);
    await setDetail(data?.product);
  };

  useEffect(() => {
    detail.length === 0 && myFun();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : (
        <div className="container pt-5">
          <div className="row">
            <div className="col-md-6 p-3 col-lg-5">
              <img
                className="img img-responsive w-100 rounded-5"
                src={`/api/v1/product/product-photo/${detail._id}`}
                alt="Card_image_cap"
              />
            </div>
            <div className="col-md-6 col-lg-7 text-white">
              <h2 className="text-warning">Product Detail</h2>
              <hr />
              <h3>{detail?.name}</h3>
              <pre>{detail?.description}</pre>
              <p>
                <b>Category : {detail?.category?.name}</b>
              </p>

              <p>
                <b>Price : </b>${detail?.price}
              </p>
              {detail.quantity < 10 ? (
                <p className="text-danger">
                  <b>{detail?.quantity} Items left</b>
                </p>
              ) : (
                <p className="text-success">
                  <b>{detail?.quantity} Items left</b>
                </p>
              )}
              <AddToCart />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default SingleProductDetail;

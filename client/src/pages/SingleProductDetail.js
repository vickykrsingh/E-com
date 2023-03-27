import React, { useEffect, useState } from "react";
import AddToCart from "../components/Buttons/AddToCart";
import Layout from "../components/Layout/Layout";
import { useDetail } from "../context/ProductDetail";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./../components/Loading.js";
import { Link } from "react-router-dom";
import SeeMore from "../components/Buttons/SeeMore";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SingleProductDetail() {
  const [detail, setDetail] = useDetail();
  const [loading, setLoading] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);
  const { pId, cId } = useParams();

  const getProduct = async () => {
    setLoading(true);
    const { data } = await axios.get(`/api/v1/product/get-product/${pId}`);
    setLoading(false);
    await setDetail(data?.product);
  };

  const similarProduct = async (cId) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/similar-product/${pId}/${cId}`
      );
      const finalProduct = data.products.filter((p) => p._id !== pId);
      setSimilarProducts(finalProduct);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
    similarProduct(cId);
  }, [pId,cId]);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

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
              <p>{detail?.description}</p>
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
          <div className="row">
            <h4 className="text-center text-warning">Similar Products</h4>
            <div className="container-fluid">
              <div className="row p-4">
                <Slider {...settings} >
                
                {similarProducts.map((s) => (
                  <Link
                    to={`/dashboard/admin/product/${s._id}`}
                    className="card bg-dark p-1 col-lg-4 col-md-6 col-sm-12 m-2 text-decoration-none text-white mx-2"
                    style={{ width: "17rem", height: "26rem" }}
                    key={s._id}
                  >
                    <img
                      className="card-img-top"
                      src={`/api/v1/product/product-photo/${s._id}`}
                      alt="Card_image_cap"
                    />
                    <div className="card-body p-1">
                      <h5 className="card-title">{s.name}</h5>
                      <p className="card-text fw-light">
                        {s.description.substring(0, 30)}...
                      </p>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item bg-dark text-white p-1 fw-bold">
                        {`$${s.price} | Stock ${s.quantity} items`}
                      </li>
                      <div className="d-flex mt-2 mb-2">
                        <AddToCart pId={s._id} cId={s.category} />
                        <SeeMore pId={s._id} cId={s.category} />
                      </div>
                    </ul>
                  </Link>
                ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default SingleProductDetail;

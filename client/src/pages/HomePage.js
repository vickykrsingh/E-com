import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import { prices } from "../components/Prices.js";
import { Radio } from "antd";
import { TfiReload } from "react-icons/tfi";
import Loading from "../components/Loading.js";
import AddToCart from "../components/Buttons/AddToCart";
import SeeMore from "../components/Buttons/SeeMore";
import { useGlobalLoading } from "../context/GlobalLoading";
import { useAuth } from "../context/AuthContext";
import Banner from "../components/Layout/banner1.png"
import toast from 'react-hot-toast'

export default function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [globalLoading, setGlobalLoading] = useGlobalLoading();
  const [auth,setAuth] = useAuth()

  useEffect(() => {
    if (!checked.length || !radio.length) {
      totalProductCount();
    }
    fetchAllCategory();
  }, [checked.length, radio.length]);

  useEffect(() => {
    getAllProduct();
    // eslint-disable-next-line
  }, []);

  const getAllProduct = async (req, res) => {
    try {
      setLoading(true);
      setGlobalLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setGlobalLoading(false);
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      toast.error("Request Timeout")
    }
  };

  const fetchAllCategory = async () => {
    try {
      const category = await axios.get("/api/v1/category/get-all-category");
      if (category?.data?.success) {
        setCategory(category?.data?.allCategory);
      }
    } catch (error) {
      toast.error("Request Timeout")
    }
  };
  const handleCategoryFilter = (value, id) => {
    let allProduct = [...checked];
    if (value) {
      allProduct.push(id);
    } else {
      allProduct = allProduct.filter((p) => p !== id);
    }
    setChecked(allProduct);
  };

  const totalProductCount = async (req, res) => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      toast.error("Request Timeout")
    }
  };

  useEffect(() => {
    if (page === 1) {
      return;
    } else {
      loadMore();
    }
    // eslint-disable-next-line
  }, [page]);

  const loadMore = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      toast.error("Request Timeout")
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) filterProducts();
    // eslint-disable-next-line
  }, [checked, radio]);
  const filterProducts = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filter", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      toast.error("Request Timeout")
    }
  };
  return (
    <>
      <Layout title={"ECommerce - Home"}>
        {globalLoading ? (
          <Loading />
        ) : (
          <div className="HomePage container-fluid">
            <div className="row m-0 p-0">
              <img src={Banner} alt="Banner" className="rounded-2 m-0 p-0" />
            </div>
            <div className="row">
              <div className="col-lg-12 filter-section">
                <div className="accordion my-2" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button bg-dark"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                        
                      >
                        Filter Product
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse bg-dark"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body bg-dark">
                        <div className="d-lg-flex">
                        {category?.map((c) => (
                          <div className="form-check mx-2" key={c._id}>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value={c.slug}
                              onChange={(e) => {
                                handleCategoryFilter(e.target.checked, c._id);
                              }}
                            />
                            <label className="form-check-label">{c.name}</label>
                          </div>
                        ))}
                        </div>
                        <br/>
                        <Radio.Group onChange={(e) => setRadio(e.target.value)} className="d-md-flex">
                          {prices.map((p) => (
                            <div key={p._id} className="mx-2">
                              <Radio value={p.array} className="text-white">
                                {p.name}
                              </Radio>
                            </div>
                          ))}
                        </Radio.Group>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="container pt-2">
                  <h4>All Products</h4>
                  {loading ? (
                    <Loading />
                  ) : (
                    <div className="row d-flex justify-content-around">
                      {products.length === 0 ? (
                        <h1 className="text-danger text-center">
                          No Products Found
                        </h1>
                      ) : (
                        products.map((p) => (
                          <Link
                            to={auth?.user?.role===1 ? (`/dashboard/admin/product/${p._id}`) : (`/product-detail/${p._id}/${p.category}`)}
                            className="card bg-dark p-1 col-lg-4 col-md-6 col-sm-12 m-2 text-decoration-none text-white"
                            style={{ width: "17rem", height: "26rem" }}
                            key={p._id}
                          >
                            <img
                              className="card-img-top rounded-2"
                              src={`/api/v1/product/product-photo/${p._id}`}
                              alt="Card_image_cap"
                            />
                            <div className="card-body p-1">
                              <h5 className="card-title">{p.name}</h5>
                              <p className="card-text fw-light">
                                {p.description.substring(0, 25)}...
                              </p>
                            </div>
                            <ul className="list-group list-group-flush p-0 m-0">
                              <li className="list-group-item bg-dark text-white p-1 fw-bold card-footer p-0 m-0">
                              &#8377;{`${p.price} | Stock ${p.quantity} items`}
                              </li>
                              <div className="d-flex mt-2 mb-2">
                                <AddToCart product={p} />
                                <SeeMore pId={p._id} cId={p.category} />
                              </div>
                            </ul>
                          </Link>
                        ))
                      )}
                    </div>
                  )}
                </div>
                {products && products.length < total && (
                  <div className="text-center m-4">
                    <button
                      className="btn bg-transparent text-white fw-bolder fs-4"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(page + 1);
                      }}
                    >
                      {loading ? <Loading /> : <TfiReload />}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Layout>
    </>
  );
}

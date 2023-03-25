import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import { prices } from "../components/Prices.js";
import { Radio } from "antd";
import { TfiReload } from "react-icons/tfi";
import Loading from "../components/Loading.js";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      getAllProduct();
      totalProductCount();
    }
    fetchAllCategory();
    // eslint-disable-next-line
  }, [checked.length, radio.length]);

  const getAllProduct = async (req, res) => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false)
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const fetchAllCategory = async () => {
    try {
      const category = await axios.get("/api/v1/category/get-all-category");
      if (category?.data?.success) {
        setCategory(category?.data?.allCategory);
      }
    } catch (error) {
      console.log(error);
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
      console.log(error);
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
      console.log(error);
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
      console.log(error);
    }
  };

  // useEffect(()=>{
  //   totalProductCount()
  // },[])

  return (
    <Layout title={"ECommerce - Home"}>
      <div className="HomePage container-fluid">
        <div className="row">
          <div className="col-lg-3">
            <h4 className="pt-2 mb-3">Filter by Category</h4>
            {category?.map((c) => (
              <div className="form-check" key={c._id}>
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
            <h4 className="pt-2 mb-3">Filter by Prices</h4>
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {prices.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array} className="text-white">
                    {p.name}
                  </Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="col-lg-9">
            <div className="container pt-2">
              <h4>All Products</h4>
              {loading ? <Loading/> : <div className="row d-flex justify-content-around">
                {products.length === 0 ? (
                  <h1 className="text-danger text-center">No Products Found</h1>
                ) : (
                  products.map((p) => (
                    <Link
                      to={`/dashboard/admin/product/${p._id}`}
                      className="card bg-dark p-1 col-lg-4 col-md-6 col-sm-12 m-2 text-decoration-none text-white"
                      style={{ width: "17rem", height: "26rem" }}
                      key={p._id}
                    >
                      <img
                        className="card-img-top"
                        src={`/api/v1/product/product-photo/${p._id}`}
                        alt="Card_image_cap"
                      />
                      <div className="card-body p-1">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text fw-light">
                          {p.description.substring(0, 30)}...
                        </p>
                      </div>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item bg-dark text-white p-1 fw-bold">
                          {`$${p.price} | Stock ${p.quantity} items`}
                        </li>
                        <div className="d-flex mt-2 mb-2">
                          <button className="btn btn-sm btn-secondary W-50">
                            ADD TO CART
                          </button>
                          <button className="btn btn-sm btn-secondary W-50 ms-2">
                            SEE MORE
                          </button>
                        </div>
                      </ul>
                    </Link>
                  ))
                )}
              </div>}
            </div>
            {products && products.length < total &&(
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
    </Layout>
  );
}

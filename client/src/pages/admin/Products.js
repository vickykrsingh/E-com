import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "./../../components/Loading";
import { TfiReload } from "react-icons/tfi";
import AddToCart from "../../components/Buttons/AddToCart";
import SeeMore from "../../components/Buttons/SeeMore";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const getAllProduct = async (req, res) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

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
    totalProductCount();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Layout title={"E-Commerce All Products"}>
          <div className="text-white container-fluid">
            <div className="row pt-5">
              <div className="col-lg-3">
                <AdminMenu />
              </div>
              <div className="col-lg-9">
                <h2 className="text white">All Products</h2>
                <div className="container">
                  <div className="row d-flex align-items-center justify-content-center">
                    {products.map((p) => (
                      <Link
                        to={`/dashboard/admin/product/${p._id}`}
                        className="card bg-dark p-1 col-lg-4 col-md-6 col-sm-12 m-2 text-decoration-none text-white"
                        style={{ width: "17rem", height: "28rem" }}
                        key={p._id}
                      >
                        <img
                          className="card-img-top"
                          src={`/api/v1/product/product-photo/${p._id}`}
                          alt="Card_image_cap"
                        />
                        <div className="card-body">
                          <h5 className="card-title">{p.name}</h5>
                          <p className="card-text">
                            {p.description.substring(0, 25)}...
                          </p>
                        </div>
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item bg-dark text-white">
                          &#8377;{`${p.price} | Stock ${p.quantity} items`}
                          </li>
                          <div className="d-flex mt-2 mb-2">
                            <AddToCart pId={p._id} cId={p.category} />
                            <SeeMore pId={p._id} cId={p.category} />
                          </div>
                        </ul>
                      </Link>
                    ))}
                  </div>
                </div>
                {products &&
                  products.length < total &&
                  products.length !== 0 && (
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
      )}
    </>
  );
}

export default Products;

import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import UserMenu from "./UserMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import Loading from "./../../components/Loading.js";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function Orders() {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();
  const navigate = useNavigate()
  const getAllOrder = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/payment/all-order");
      if (data?.success) {
        setOrder(data?.orders);
        setLoading(false);
      }
    } catch (error) {
      toast.error("Error while fetching your all order");
    }
  };

  // getAllOrder()

  useEffect(() => {
    if (auth?.token) {
      getAllOrder();
    }
  }, [auth?.token]);

  return (
    <Layout>
      <div className="text-white container-fluid">
        <div className="row pt-5">
          <div className="col-lg-3">
            <UserMenu />
          </div>
          {loading ? (
            <Loading />
          ) : (
            <div className="col-lg-9 p-0">
              <h2 className="mt-3 mt-md-0 ms-2 text-success">Your all orders</h2>
              <div className="container-fluid">
                {order.map((o, i) => (
                  <div className="row user-order" key={o._id}>
                    <div className="col-12">
                      <div>
                        <b>Order Count : </b>
                        {i + 1}
                      </div>
                      <div>
                        <b>Order Id : </b>
                        {o.order_id}
                      </div>
                      <div>
                        <b>Item Count : </b>
                        {o.products.length}
                      </div>
                      <div>
                        <b>Total Price : </b>
                        {o.totalPrice}
                      </div>
                      <div>
                        <b>Shipping Status : </b>
                        {o.status}
                      </div>
                      <div>
                        <b>Time : </b>
                        {moment(o.createdAt).fromNow()}
                      </div>
                    </div>
                    <div className="col-12 p-0">
                      {o.products.map((p, i) => (
                        <div className="col-12 p-3 w-100" key={p._id} onClick={(e)=>{
                          e.preventDefault()
                          navigate(`/product-detail/${p.productId}/${p.categoryId}`)
                        }}>
                          <div className="card d-flex flex-row p-2 w-100">
                            <div className="card-image d-flex align-items-center justify-content-center">
                              <img
                                src={`/api/v1/product/product-photo/${p.productId}`}
                                alt="Apple watch"
                                width={"100px"}
                                className="rounded-2"
                              />
                            </div>
                            <div className="card-detail ms-4">
                              <h5 className="m-0 p-0">{p.pName}</h5>
                              <p className="m-0 p-0">
                                {p.pDescription.substring(0, 30)}...
                              </p>
                              <p className="m-0 p-0">
                                <b>Price : &#8377;{p.pPrice}</b>
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Orders;

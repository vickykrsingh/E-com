import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

function AllOrders() {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState([]);
  const [search, setSearchChange] = useState("");
  const [searchKey, setSearchKey] = useState("order_id");
  const [auth] = useAuth();
  const [status] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);
  const navigate = useNavigate();
  const getAllOrder = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/payment/all-admin-order");
      if (data?.success) {
        setOrder(data?.orders);
        setLoading(false);
      }
    } catch (error) {
      toast.error("Error while fetching your all order");
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getAllOrder();
    }
  }, [auth?.token]);

  const handleChangeStatus = async (orderId, value) => {
    try {
      await axios.put(`/api/v1/payment/order-status/${orderId}`, {
        status: value,
      });
      getAllOrder();
    } catch (error) {
      toast.error("Request Timeout");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/v1/payment/search-order`, {
        searchKey: searchKey,
        searchValue: search,
      });
      if (data?.success) {
        setOrder(data?.order);
      } else {
        toast.error("No Data Found");
      }
    } catch (error) {
      toast.error("No Order Found");
    }
  };

  return (
    <Layout>
      <div className="text-white container-fluid">
        <div className="row pt-5">
          <div className="col-lg-3">
            <AdminMenu />
          </div>
          <div className="col-lg-9">
            <h2 className="text white mt-2">All Orders</h2>
            <form
              className="form control my-2"
              onSubmit={(e) => handleSearch(e)}
            >
              <div className=" mb-1 col-md-6">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) => setSearchKey(e.target.value)}
                >
                  <option defaultValue={"order_id"}>Order ID</option>
                  <option value={"payment_id"}>Payment Id</option>
                  <option value={"buyer"}>User Id</option>
                  <option value={"status"}>Shipping Status</option>
                </select>
                <input
                  type="text"
                  placeholder="Enter Value"
                  className="form-control bg-transparent custom-input col-md-6"
                  value={search}
                  onChange={(e) => setSearchChange(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-outline-success">
                Search
              </button>
            </form>
            <div className="container-fluid">
              {order.map((o, i) => (
                <div className="row admin-order py-1" key={o._id}>
                  <div className="col-12">
                    <div>
                      <b>Order ID : </b>
                      {o.order_id}
                    </div>
                    <div>
                      <b>Payment ID : </b>
                      {o.payment_id}
                    </div>
                    <div>
                      <b>User ID : </b>
                      {o.buyer}
                    </div>
                    <div>
                      <b>Order Time : </b>
                      {moment(o.createdAt).fromNow()}
                    </div>
                    <div>
                      <b>Shipping Status : </b>
                      <Select
                        bordered={false}
                        onChange={(value) => handleChangeStatus(o._id, value)}
                        defaultValue={o?.status}
                      >
                        {status.map((s, i) => (
                          <Option key={i} value={s}>
                            {s}
                          </Option>
                        ))}
                      </Select>
                    </div>
                  </div>
                  <div className="col-12 p-0">
                    {o.products.map((p, i) => (
                      <div
                        className="col-12 p-3 w-100"
                        key={p._id}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(
                            `/product-detail/${p.productId}/${p.categoryId}`
                          );
                        }}
                      >
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
        </div>
      </div>
    </Layout>
  );
}

export default AllOrders;

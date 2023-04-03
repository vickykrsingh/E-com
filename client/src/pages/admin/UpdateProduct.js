import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./AdminMenu";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
import { useParams } from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";
const { Option } = Select;

function UpdateProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  // =======================State to store from data============================
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [pid, setPid] = useState("");
  const params = useParams();

  //   ==============Get Single Product==================
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.id}`
      );
      setName(data.product.name);
      setDescription(data.product.description);
      setQuantity(data.product.quantity);
      setPrice(data.product.price);
      setShipping(data.product.shipping);
      photo && setPhoto(data.product.photo);
      setPid(data.product._id);
      setCategory(data.product.category._id);
    } catch (error) {
      toast.error("Request Timeout")
    }
  };

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line
  }, []);

  // ========================Fetch All Category=========================
  const fetchAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-all-category");
      if (data?.success) {
        setCategories(data?.allCategory);
      }
    } catch (error) {
      toast.error("Something Went Wrong while Fetching All Category");
    }
  };
  // =====================Use Effect to fetch all category after component rendered first time=======================
  useEffect(() => {
    fetchAllCategory();
  }, []);
  // ============================Handler to send form data to the server==============================
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);
      const { data } = await axios.put(
        `/api/v1/product/update-product/${pid}`,
        productData
      );
      if (data?.success) {
        toast.success(data?.message);
        navigate("/dashboard/admin/products");
        await axios.get("/api/v1/product/get-product");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };
  const handleDelete = async () => {
    try {
      const ans = prompt("Are you sure to delete this product ?");
      if (!ans) {
        return;
      }
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${pid}`
      );
      if (data?.success) {
        toast.success(data?.message);
        navigate("/dashboard/admin/products");
        await axios.get("/api/v1/product/get-product");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("Something Went Wrong");
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
            <h2 className="text white">Update Product</h2>

            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a Category"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3 w-100">
                <label className="btn btn-outline-secondary w-100">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`/api/v1/product/product-photo/${pid}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={description}
                  placeholder="Write Description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Enter Product Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={quantity}
                  placeholder="Enter Product Quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <Select
                bordered={false}
                placeholder="Select Shipping"
                size="large"
                showSearch
                className="form-select mb-3"
                value={shipping === "0" ? "No" : "Yes"}
                onChange={(value) => {
                  setShipping(value);
                }}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className="mb-3">
              <button className="btn btn-warning m-2" onClick={handleUpdate}>
                UPDATE PRODUCT
              </button>
              <button className="btn btn-danger m-2" onClick={handleDelete}>
                DELETE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UpdateProduct;

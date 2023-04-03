import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const [tot, setTot] = useState(0);
  const navigate = useNavigate();

  const getAllCart = async () => {
    try {
      const { data } = await axios.get("/api/v1/cart/get-all-cart");
      setCart(data?.cartItem);
    } catch (error) {
      toast.error("Request Timeout");
    }
  };

  const fetchTotPrice = async () => {
    try {
      const { data } = await axios.get("/api/v1/cart/get-all-cart");
      if (data?.cartItem.length > 0) {
        const tot = data?.cartItem.map((t) => t.pPrice);
        const total = tot.reduce(function (a, b) {
          return a + b;
        });
        setTot(total);
      }
    } catch (error) {
      toast.error("Request Timeout hi");
    }
  };

  const handleRemoveCart = async (event, id) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/cart/delete-single-cart", {
        id,
      });
      if (data?.success) {
        toast.success("Removed From cart Successfully");
        getAllCart();
        fetchTotPrice();
      }
    } catch (error) {
      toast.error("Request Timeout");
    }
  };

  const handleCheckout = async () => {
    try {
      const {
        data: { key },
      } = await axios.get("http://www.localhost:3000/api/get-key");
      const {
        data: { order },
      } = await axios.post(
        "http://www.localhost:3000/api/v1/payment/checkout",
        {
          amount: Number(tot),
        }
      );
      var options = {
        key: key,
        amount: order.amount,
        currency: "INR",
        name: "DD Product",
        description: "Test Transaction",
        order_id: order.id,
        handler: async function (response) {
          const { data } = await axios.post(
            "http://localhost:8080/api/v1/payment/payment-verification",
            {
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              signature: response.razorpay_signature,
              cart: cart,
              tot,
            }
          );
          if (data?.success) {
            setCart([]);
            navigate("/dashboard/user/orders");
          }
        },
        prefill: {
          name: "Vicky Kumar",
          email: "vickykrsingh27@gmail.com",
          contact: "9508896862",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      toast.error("Request Timeout");
    }
  };

  useEffect(() => {
    getAllCart();
    fetchTotPrice();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          {cart.length === 0 ? (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ width: "100%", height: "100vh" }}
            >
              <h3 className="text-center text-info">No item in Your Cart</h3>
            </div>
          ) : (
            <h4 className="text-success my-4">{`You Have ${
              cart?.length || "0"
            } items in Your Cart , Please Check it Out`}</h4>
          )}
          {cart?.map((p) => (
            <div className="col-12 p-3" key={p._id}>
              <div className="card d-flex flex-row p-2">
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
                  <button
                    className="btn btn-danger btn-sm my-1"
                    onClick={(event) => handleRemoveCart(event, p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row d-flex w-100 justify-content-end">
          <div className="col-sm-5 text-align-content-end bg-dark border-0">
            {auth?.user ? (
              <div className="col-12 form-control d-flex flex-column align-items-end bg-dark border-0">
                <h3>Total : &#8377;{tot}</h3>
                <button
                  className="btn btn-outline-success form-control"
                  onClick={handleCheckout}
                >
                  Proceed To Checkout
                </button>
              </div>
            ) : (
              <div className="col-12">
                <h3 className="text-danger">OOPS Your are not Loged In</h3>
                <h5 className="text-danger text-light">
                  Please Login to checkout
                </h5>
                <button
                  className="btn btn-outline-danger form-control"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;

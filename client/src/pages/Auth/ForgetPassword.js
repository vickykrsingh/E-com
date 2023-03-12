import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [answer, setAnswer] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate();
  
    const forgetPassword = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post("/api/v1/auth/forgetpassword", {
          email,
          answer,
          newPassword
        });
        if (res && res.data.success) {
          toast.success(res.data && res.data.message);
          navigate("/login");
        } else {
          toast.error(res.data.error);
        }
      } catch (error) {
        toast.error("something went wrong!");
      }
    };
  return (
    <Layout title={"E-Commerce - Forget Password"}>
        <h2 className="text-warning fw-bold text-center pt-5">Reset Password</h2>
        <div className="login container mt-4">
          <div className="row w-100 d-flex align-items-center justify-content-center">
            <div className="col-lg-5 col-md-8">
              <form onSubmit={(e) => forgetPassword(e)}>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter Your Favorite IPL team"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-outline-warning form-control fw-bold text-white"
                >
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default ForgetPassword
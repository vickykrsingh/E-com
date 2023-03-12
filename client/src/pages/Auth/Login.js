import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useNavigate , useLocation, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("something went wrong!");
    }
  };

  return (
    <>
      <Layout title={"ECommerce - Login"}>
        <h2 className="text-warning fw-bold text-center pt-5">Login</h2>
        <div className="login container mt-4">
          <div className="row w-100 d-flex align-items-center justify-content-center">
            <div className="col-lg-5 col-md-8">
              <form onSubmit={(e) => login(e)}>
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
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <Link to='/forgetpassword' className="btn btn-outline-warning form-control fw-bold text-white mb-3">Forget Password</Link>
                <button
                  type="submit"
                  className="btn btn-outline-warning form-control fw-bold text-white"
                >
                  LOGIN
                </button>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

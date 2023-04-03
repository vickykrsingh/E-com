import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Search from "../Search";
import { useCart } from "../../context/CartContext";
import { Badge } from "antd";
import { BsCartFill } from 'react-icons/bs'

export default function Header() {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: null,
    });
    localStorage.removeItem("auth");
  };
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary bg-dark"
      >
        <div className="container-fluid">
          <div>
            <Link className="navbar-brand" to="/">
              DD Products
            </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              {auth.user ? (
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    aria-current="page"
                  >
                    {auth?.user.name}
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to="/login"
                        onClick={() => handleLogout()}
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              ) : (
                <div className="d-lg-flex">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/register"
                    >
                      Register
                    </NavLink>
                  </li>
                </div>
              )}
              
              <li className="py-2 py-lg-0">
              <Search />
              </li>
            </ul>
              <li className="nav-item" style={{listStyle:'none'}}>
                <NavLink className="nav-link me-2" aria-current="page" to="/cart">
                  <Badge count={cart?.length}>
                    <span className="mx-2">
                      <BsCartFill className="text-warning" size={30} />
                    </span>
                  </Badge>
                </NavLink>
              </li>
          </>
          </div>
        </div>
      </nav>
    </>
  );
}

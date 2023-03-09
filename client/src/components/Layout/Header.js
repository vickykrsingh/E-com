import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const [ auth , setAuth ] = useAuth()
  const handleLogout = () => {
    setAuth({
      ...auth,
      user:null,
      token:null,
    })
    localStorage.removeItem('auth')
  }
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary bg-primary"
        data-bs-theme="dark"
      >
        <Link className="navbar-brand" to="/">
          Hidden brand
        </Link>
        <div className="container-fluid">
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              {auth.user ? (<div>
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="/login" onClick={()=>handleLogout()}>
                    Logout
                  </NavLink>
                </li>
              </div>) :
              (<div className="d-flex">
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="/login">
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
              </div>)}

              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/cart">
                  Cart(0)
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

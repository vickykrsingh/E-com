import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Spinner({ path = "login" }) {
  const location = useLocation();
  const [count, setCount] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 &&
      navigate(`/${path}`, {
        state: location?.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location?.pathname, path]);

  return (
    <div className="spin bg-dark">
      <div className="spinner-grow text-warning" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div>
        <span className="text-warning fw-bold fs-4">
          Redirecting You in {count}
        </span>
      </div>
    </div>
  );
}

export default Spinner;

import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="text-center bg-dark text-white py-3 footer">
      <h3 className="fw-bold">All Rights Reserved &copy; Vickykrsingh</h3>
      <div>
        <Link to="/about">About</Link> |<Link to="/privacy">Privacy</Link> |
        <Link to="/contact">Contact</Link>
      </div>
    </div>
  );
}

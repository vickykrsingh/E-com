import React from "react";
import { NavLink } from "react-router-dom";

function AdminMenu() {
  return (
    <>
      <div className="list-group mr-5">
        <NavLink
          to="/dashboard/admin/create-category"
          className="list-group-item list-group-item-light bg-dark list-group-item-action"
        >
          Create Category
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-product"
          className="list-group-item list-group-item-light bg-dark list-group-item-action"
        >
          Create Product
        </NavLink>
        <NavLink
          to="/dashboard/admin/products"
          className="list-group-item list-group-item-light bg-dark list-group-item-action"
        >
          All Products
        </NavLink>
        <NavLink
          to="/dashboard/admin/all-orders"
          className="list-group-item list-group-item-light bg-dark list-group-item-action"
        >
          All Orders
        </NavLink>
        <NavLink
          to="/dashboard/admin/all-users"
          className="list-group-item list-group-item-light bg-dark list-group-item-action"
        >
          Users
        </NavLink>
      </div>
    </>
  );
}

export default AdminMenu;

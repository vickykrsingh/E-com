import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "./AdminMenu";
import { useAuth } from "../../context/AuthContext";

function AdminDashboard() {
  const [auth] = useAuth();
  return (
    <Layout title={"E-Commerce - Admin"}>
      <div className="text-white container-fluid">
        <div className="row pt-5">
          <div className="col-lg-3">
            <AdminMenu />
          </div>
          <div className="col-lg-9 pl-5">
            <h3>{auth?.user?.name}</h3>
            <h3>{auth?.user?.email}</h3>
            <h3>{auth?.user?.phone}</h3>
            <h3>{auth?.user?.address}</h3>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;

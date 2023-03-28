import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "./UserMenu";
import { useAuth } from "../../context/AuthContext";

function Dashboard() {
  const [auth] = useAuth();
  return (
    <Layout title={"E-Commerce - Dashboard"}>
      <div className="text-white container-fluid">
        <div className="row pt-5">
          <div className="col-lg-3">
            <UserMenu />
          </div>
          <div className="col-lg-9">
            <h2 className="text white">{auth?.user?.name}</h2>
            <h2 className="text white">{auth?.user?.email}</h2>
            <h2 className="text white">{auth?.user?.address}</h2>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;

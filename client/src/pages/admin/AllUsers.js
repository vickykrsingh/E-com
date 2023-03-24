import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "./AdminMenu";

function AllUsers() {
  return (
    <Layout>
      <div className="text-white container-fluid">
        <div className="row pt-5">
          <div className="col-lg-3">
            <AdminMenu />
          </div>
          <div className="col-lg-9">
            <h2 className="text white">All Users</h2>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AllUsers;

import React from "react";
import Layout from "./Layout/Layout";
import { Spin } from "antd";

function Loading() {
  return (
    <Layout title={"Loading"}>
      <div className="loading">
        <Spin />
        <h3 className="text-white">Please Wait...</h3>
      </div>
    </Layout>
  );
}

export default Loading;

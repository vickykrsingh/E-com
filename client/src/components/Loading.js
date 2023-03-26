import React from "react";
import { Spin } from "antd";

function Loading() {
  return (
    <div className="loading">
      <Spin />
      <h3 className="text-white">Please Wait...</h3>
    </div>
  );
}

export default Loading;

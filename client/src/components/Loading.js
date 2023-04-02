import React from "react";
import { PacmanLoader } from 'react-spinners'
function Loading() {
  return (
    <div className="loading">
      <PacmanLoader color="#36d7b7" />
    </div>
  );
}

export default Loading;

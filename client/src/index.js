import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.js";
import { SearchProvider } from "./context/SearchContext.js";
import { DetailProvider } from "./context/ProductDetail.js";
import { CartProvider } from "./context/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <CartProvider>
      <SearchProvider>
        <DetailProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </DetailProvider>
      </SearchProvider>
    </CartProvider>
  </AuthProvider>
);

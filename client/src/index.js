import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.js";
import { SearchProvider } from "./context/SearchContext.js";
import { DetailProvider } from "./context/ProductDetail.js";
import { CartProvider } from "./context/CartContext";
import { GlobalLoadingProvider } from "./context/GlobalLoading";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <GlobalLoadingProvider>
    <CartProvider>
      <SearchProvider>
        <DetailProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </DetailProvider>
      </SearchProvider>
    </CartProvider>
    </GlobalLoadingProvider>
  </AuthProvider>
);

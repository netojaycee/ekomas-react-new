import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { CategoryProvider } from "./components/Context/CategoryContext.jsx";
import { ProductProvider } from "./components/Context/ProductContext.jsx";
import CartProvider from "./components/Context/CartContext.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/Context/AuthContext.jsx";
import { LoadingProvider } from "./components/Context/LoadingContext.jsx";
import WishProvider from "./components/Context/WishContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <AuthProvider>
          <CartProvider>
            <CategoryProvider>
              <ProductProvider>
                <WishProvider>
                <Routes>
                  <Route path="/*" element={<App />} />
                </Routes>
                </WishProvider>
              </ProductProvider>
            </CategoryProvider>
          </CartProvider>
        </AuthProvider>
      </LoadingProvider>
    </BrowserRouter>
  </React.StrictMode>
);

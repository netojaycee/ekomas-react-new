import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { CategoryProvider } from "./components/Context/CategoryContext.jsx";
import { ProductProvider } from "./components/Context/ProductContext.jsx";
import CartProvider from "./components/Context/CartContext.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <CategoryProvider>
          <ProductProvider>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </ProductProvider>
        </CategoryProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);

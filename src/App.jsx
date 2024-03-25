import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/Admin/AdminLogin";
import UserDashboard from "./pages/User/UserDashboard";
import Orders from "./pages/User/Orders";
import { Products } from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddProduct from "./pages/Admin/AddProduct";
import AddCategory from "./pages/Admin/AddCategory";
import AllCategory from "./pages/Admin/AllCategory";
import AllProduct from "./pages/Admin/AllProduct";
import { ProductDetails } from "./pages/ProductDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/orders" element={<Orders />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/add-category" element={<AddCategory />} />
        <Route path="/admin/all-category" element={<AllCategory />} />
        <Route path="/admin/all-product" element={<AllProduct />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </>
  );
}

export default App;

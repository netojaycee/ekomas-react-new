import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Pages/Home";
import ProductDetails from "./components/Pages/ProductDetails";
import AllProduct from "./components/Pages/AllProduct";
import Register from "./components/Pages/Register";
import Login from "./components/Pages/Login";
import AddProduct from "./components/Pages/Admin/AddProduct";
import AddCategory from "./components/Pages/Admin/AddCategory";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route index element={<Home />} />
          <Route path="/all-product" element={<AllProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/add-category" element={<AddCategory />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

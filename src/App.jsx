import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/User/UserDashboard";
import Orders from "./pages/User/Orders";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddProduct from "./pages/Admin/AddProduct";
import AddCategory from "./pages/Admin/AddCategory";
import AllCategory from "./pages/Admin/AllCategory";
import AllProduct from "./pages/Admin/AllProduct";
import Unauthorized from "./components/Unauthorized";
import PersistLogin from "./components/hook/PersistLogin";
import SiteLayout from "./components/SiteLayout";
import Error from "./components/Error";
import { ToastContainer } from "react-toastify";
import UserLayout from "./components/Dashboard/UserLayout";
import RequireAuth from "./components/hook/RequireAuth";
import AdminLayout from "./components/Dashboard/AdminLayout";
import "react-toastify/dist/ReactToastify.css";
import SavedItems from "./pages/User/SavedItems";


function App() {
  const ROLES = {
    User: "user",
    Admin: "admin",
  };

  return (
    <>
      <Routes>
        <Route element={<PersistLogin />}>
          <Route path="/" element={<SiteLayout />}>


            {/* PUBLIC ROUTES */}
            <Route path="/" element={<Home />} />
            <Route path="/:reference" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />

            {/* USER ROUTES */}
            <Route path="/" element={<UserLayout />}>
              <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                <Route path="/user/dashboard" element={<UserDashboard />} />
                <Route path="/user/orders" element={<Orders />} />
                <Route path="/user/saved-items" element={<SavedItems />} />
                <Route path="/checkout" element={<Checkout />} />
              </Route>
            </Route>

            {/* ADMIN AND USER ROUTES */}
            <Route
              element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}
            >
              <Route path="/unauthorized" element={<Unauthorized />} />
            </Route>

            <Route path="/*" element={<Error />} />
          </Route>

          {/* ADMIN ROUTES */}
          <Route path="/" element={<AdminLayout />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/add-product" element={<AddProduct />} />
              <Route path="/admin/add-category" element={<AddCategory />} />
              <Route path="/admin/all-category" element={<AllCategory />} />
              <Route path="/admin/all-product" element={<AllProduct />} />
            </Route>
          </Route>
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // style={{ zIndex: 9999 }}
      />
    </>
  );
}

export default App;

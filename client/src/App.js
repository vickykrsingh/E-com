import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/HomePage";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./components/Routes/AdminRoute";
import CreateProduct from "./pages/admin/CreateProduct";
import CreateCategory from "./pages/admin/CreateCategory";
import Users from "./pages/admin/AllUsers";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";
import Products from "./pages/admin/Products";
import UpdateProduct from "./pages/admin/UpdateProduct";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:id" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/all-users" element={<Users />} />
        </Route>
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;

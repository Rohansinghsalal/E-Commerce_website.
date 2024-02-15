import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import PagenotFound from "./pages/PagenotFound";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { isAuthFalse, isAuthTrue } from "./redux/features/authSlice";
import { setUser } from "./redux/features/userSlice";
import { loadingFalse } from "./redux/features/loadingSlice";

import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import ForgetPassword from "./pages/ForgetPassword";
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./routes/AdminRoute";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";
import Products from "./pages/admin/Products";
import UpdateProduct from "./pages/admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/admin/AdminOrders";
import About from "./pages/About";

const App = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auths);
  const { user } = useSelector((state) => state.users);

  const getUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/users/get-my-details",
        {
          withCredentials: true,
        },
      );
      const isSucc = res.data.success;
      if (isSucc) {
        dispatch(isAuthTrue());
        dispatch(setUser(res.data.user));
      }
    } catch (error) {
      console.log(error.response.data.message);
      dispatch(isAuthFalse());
      dispatch(loadingFalse());
    }
  };
  // it will render on 1st and when auth changes (if auth remains same no effect);
  useEffect(() => {
    getUser();
  }, [auth]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />

        <Route path="/cart" element={<CartPage />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="*" element={<PagenotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;

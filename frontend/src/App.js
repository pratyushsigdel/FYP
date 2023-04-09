import "./App.css";
import { useEffect, useState } from "react";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails";
import HiringRequest from "./component/HiringRequest/HiringRequest";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import { ProtectedRoute } from "protected-route-react";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from "axios";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/product/:id" Component={ProductDetails} />
        <Route exact path="/products" Component={Products} />
        <Route path="/products/:keyword" Component={Products} />
        <Route exact path="/search" Component={Search} />
        <Route
          exact
          path="/account"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              {" "}
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/me/update"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              {" "}
              <UpdateProfile />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/password/update"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              {" "}
              <UpdatePassword />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/shipping"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              {" "}
              <Shipping />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/order/confirm"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              {" "}
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />
        <Route exact path="/hiring-form" Component={HiringRequest} />

        <Route exact path="/password/forgot" Component={ForgotPassword} />
        <Route exact path="/password/reset/:token" Component={ResetPassword} />
        <Route exact path="/login" Component={LoginSignUp} />
        <Route exact path="/cart" Component={Cart} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

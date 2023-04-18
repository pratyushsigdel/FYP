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
import Payment from "./component/Cart/Payment.js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/admin/Dashboard.js";
import ProductList from "./component/admin/ProductList";
import NewProduct from "./component/admin/NewProduct";
import UpdateProduct from "./component/admin/UpdateProduct.js";
import OrderList from "./component/admin/OrderList";
import UsersList from "./component/admin/UsersList";
import UpdateUser from "./component/admin/UpdateUser";
import ProductReviews from "./component/admin/ProductReviews";
import ProcessOrder from "./component/admin/ProcessOrder.js";
import OrderForm from "./component/HiringRequest/HiringRequest";
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";
import ServiceList from "./component/admin/ServiceList";
import Service from "./component/Service";
import { UpdateService } from "./component/admin/UpdateService";
import HireList from "./component/admin/HireList";
import UpdateHire from "./component/admin/UpdateHire";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");
  const stripePromise = loadStripe(stripeApiKey);
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
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
        <Route exact path="/password/forgot" Component={ForgotPassword} />
        <Route exact path="/password/reset/:token" Component={ResetPassword} />
        <Route exact path="/login" Component={LoginSignUp} />
        <Route exact path="/cart" Component={Cart} />
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
          path="/success"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              {" "}
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/orders"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              {" "}
              <MyOrders />
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
        <Route
          exact
          path="/process/payment"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              {" "}
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/order/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              {" "}
              <OrderDetails />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/dashboard"
          element={
            <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}>
              {" "}
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/products"
          element={
            <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}>
              {" "}
              <ProductList />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/product"
          element={
            <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}>
              {" "}
              <NewProduct />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/product/:id"
          element={
            <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}>
              {" "}
              <UpdateProduct />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/orders"
          element={
            <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}>
              {" "}
              <OrderList />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/order/:id"
          element={
            <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}>
              {" "}
              <ProcessOrder />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/users"
          element={
            <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}>
              {" "}
              <UsersList />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/user/:id"
          element={
            <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}>
              {" "}
              <UpdateUser />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/reviews"
          element={
            <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}>
              {" "}
              <ProductReviews />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/hires"
          element={
            <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}>
              {" "}
              <HireList />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/hires/:id"
          element={
            <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}>
              {" "}
              <UpdateHire />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/service"
          element={
            <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}>
              {" "}
              <ServiceList />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/service/:id"
          element={
            <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated}>
              {" "}
              <UpdateService />
            </ProtectedRoute>
          }
        />
        <Route exact path="/hirerequest" Component={HiringRequest} />
        <Route exact path="/Contact" Component={Contact} />
        <Route exact path="/About" Component={About} />
        <Route exact path="/service" Component={Service} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

import React, { useContext } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
// Removed unused imports
import Checkout from "./screens/Checkout/Checkout";
import EmailSent from "./screens/EmailSent/EmailSent";
import Favourites from "./screens/Favourites/Favourites";
import ForgotPassword from "./screens/ForgotPassword/ForgotPassword";
import Home from "./screens/Home/Home";
import Login from "./screens/Login/Login";
import LoginEmail from "./screens/LoginEmail/LoginEmail";
import MyOrders from "./screens/MyOrders/MyOrders";
import NewLogin from "./screens/NewLogin/NewLogin";
import OrderDetail from "./screens/OrderDetail/OrderDetail";
import Paypal from "./screens/Paypal/Paypal";
import Privacy from "./screens/Privacy/Privacy";
import Profile from "./screens/Profile/Profile";
import Settings from "./screens/Settings/Settings";
import Registration from "./screens/Registration/Registration";
import PhoneNumber from "./screens/PhoneNumber/PhoneNumber";
import VerifyEmail from "./screens/VerifyEmail/VerifyEmail";
import VerifyForgotOtp from "./screens/VerifyForgotOtp/VerifyForgotOtp";
import ResetPassword from "./screens/ResetPassword/ResetPassword";
import RestaurantDetail from "./screens/RestaurantDetail/RestaurantDetail";
import Restaurants from "./screens/Restaurants/Restaurants";
import Stripe from "./screens/Stripe/Stripe";
import Terms from "./screens/Terms/Terms";
import Pickup from "./screens/Pickup/Pickup";
import * as Sentry from "@sentry/react";
import AuthRoute from "./routes/AuthRoute";
import PrivateRoute from "./routes/PrivateRoute";
import VerifyPhone from "./screens/VerifyPhone/VerifyPhone";
import UserContext from "./context/User";
// Removed unused imports
// import { Box, CircularProgress } from "@mui/material";
// import { getToken, onMessage } from "firebase/messaging";
// import { initialize, isFirebaseSupported } from "./firebase";
// import FlashMessage from "./components/FlashMessage";
// import { useTranslation } from "react-i18next";

function App() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant-list" element={<Restaurants />} />
        <Route path="/restaurant/:slug" element={<RestaurantDetail />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/pickup" element={<Pickup />} />
        <Route
          path={"/login"}
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />
        <Route
          path={"/registration"}
          element={
            <AuthRoute>
              <Registration />
            </AuthRoute>
          }
        />
        <Route
          path={"/new-login"}
          element={
            <AuthRoute>
              <NewLogin />
            </AuthRoute>
          }
        />
        <Route
          path={"/login-email"}
          element={
            <AuthRoute>
              <LoginEmail />
            </AuthRoute>
          }
        />
        <Route
          path={"/verify-email"}
          element={
            <AuthRoute>
              <VerifyEmail />
            </AuthRoute>
          }
        />
        <Route
          path={"/new-password"}
          element={
            <AuthRoute>
              <ResetPassword />
            </AuthRoute>
          }
        />
        <Route
          path={"/phone-number"}
          element={
            <PrivateRoute>
              <PhoneNumber />
            </PrivateRoute>
          }
        />
        <Route
          path={"/verify-phone"}
          element={
            <PrivateRoute>
              <VerifyPhone />
            </PrivateRoute>
          }
        />
        <Route
          path={"/forgot-password"}
          element={
            <AuthRoute>
              <ForgotPassword />
            </AuthRoute>
          }
        />
        <Route
          path={"/verify-forgot-otp"}
          element={
            <AuthRoute>
              <VerifyForgotOtp />
            </AuthRoute>
          }
        />
        <Route
          path={"/email-sent"}
          element={
            <AuthRoute>
              <EmailSent />
            </AuthRoute>
          }
        />
        <Route
          path={"/orders"}
          element={
            <PrivateRoute>
              <MyOrders />
            </PrivateRoute>
          }
        />
        <Route
          path={"/profile"}
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path={"/settings"}
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
        <Route
          path={"/checkout"}
          element={isLoggedIn ? <Checkout /> : <Login />}
        />
        <Route
          path={"/order-detail/:id"}
          element={
            <PrivateRoute>
              <OrderDetail />
            </PrivateRoute>
          }
        />
        <Route
          path={"/paypal"}
          element={
            <PrivateRoute>
              <Paypal />
            </PrivateRoute>
          }
        />
        <Route
          path={"/stripe"}
          element={
            <PrivateRoute>
              <Stripe />
            </PrivateRoute>
          }
        />
        <Route
          path={"/favourite"}
          element={
            <PrivateRoute>
              <Favourites />
            </PrivateRoute>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default Sentry.withProfiler(App);

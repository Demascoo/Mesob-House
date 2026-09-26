import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import Layout from "./Layout";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import RequireAuth from "./RequireAuth";

const DishDetail = lazy(() => import("./pages/DishDetail"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Account = lazy(() => import("./pages/Account"));
const NotFound = lazy(() => import("./pages/NotFound"));

function Loader() {
  return <p className="spinner">Loading…</p>;
}

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route
            path="menu/:slug"
            element={
              <Suspense fallback={<Loader />}>
                <DishDetail />
              </Suspense>
            }
          />
          <Route
            path="cart"
            element={
              <Suspense fallback={<Loader />}>
                <Cart />
              </Suspense>
            }
          />
          <Route
            path="checkout"
            element={
              <Suspense fallback={<Loader />}>
                <RequireAuth>
                  <Checkout />
                </RequireAuth>
              </Suspense>
            }
          />
          <Route
            path="order-confirmation"
            element={
              <Suspense fallback={<Loader />}>
                <OrderConfirmation />
              </Suspense>
            }
          />
          <Route
            path="login"
            element={
              <Suspense fallback={<Loader />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="register"
            element={
              <Suspense fallback={<Loader />}>
                <Register />
              </Suspense>
            }
          />
          <Route
            path="account"
            element={
              <Suspense fallback={<Loader />}>
                <RequireAuth>
                  <Account />
                </RequireAuth>
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<Loader />}>
                <NotFound />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

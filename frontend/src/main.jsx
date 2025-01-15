import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Loader } from "./Components/index.js";

const LandingPage = lazy(() => import("./pages/LandingPage.jsx"));
const LoginPage = lazy(() => import("./pages/Login.jsx"));
const SignupPage = lazy(() => import("./pages/SignUp.jsx"));
const CartPage = lazy(() => import("./pages/CartPage.jsx"));
const Wishlist = lazy(() => import("./pages/Wishlist.jsx"));
const ListingPage = lazy(() => import("./pages/ProductsListingPage.jsx"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetail.jsx"));
const AccountSetting = lazy(() => import("./pages/AccountSetting.jsx"));
const MyOrders = lazy(() => import("./pages/MyOrders.jsx"));
const RatingForm = lazy(() => import("./pages/RatingForm.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loader />}>
            <LandingPage />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<Loader />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={<Loader />}>
            <SignupPage />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<Loader />}>
            <CartPage />
          </Suspense>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <Suspense fallback={<Loader />}>
            <Wishlist />
          </Suspense>
        ),
      },
      {
        path: "/products",
        element: (
          <Suspense fallback={<Loader />}>
            <ListingPage />
          </Suspense>
        ),
      },
      {
        path: "/product-details",
        element: (
          <Suspense fallback={<Loader />}>
            <ProductDetailPage />
          </Suspense>
        ),
      },
      {
        path: "/account-setting",
        element: (
          <Suspense fallback={<Loader />}>
            <AccountSetting />
          </Suspense>
        ),
      },
      {
        path: "/orders",
        element: (
          <Suspense fallback={<Loader />}>
            <MyOrders />
          </Suspense>
        ),
      },
      {
        path: "/ratings",
        element: (
          <Suspense fallback={<Loader />}>
            <RatingForm />
          </Suspense>
        ),
      },
      {
        path: "/admin/dashboard",
        element: (
          <Suspense fallback={<Loader />}>
            <Dashboard />
          </Suspense>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);

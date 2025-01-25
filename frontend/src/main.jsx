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
const ForgotPassword = lazy(() => import("./pages/ForgotPassword.jsx"));
const ConfirmPassword = lazy(() => import("./pages/ConfirmPassword.jsx"));
const ChangePassword = lazy(() => import("./pages/ChangePassword.jsx"));
const RatingForm = lazy(() => import("./pages/RatingForm.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Graphs = lazy(() => import("./pages/Graphs.jsx"));
const DashboardAllProducts = lazy(() =>
  import("./pages/DashboardAllProducts.jsx")
);
const DashboardOrderList = lazy(() => import("./pages/DashboardOrderList.jsx"));
const DashboardOrderDetail = lazy(() =>
  import("./pages/DashboardOrderDetail.jsx")
);
const AddProducts = lazy(() => import("./pages/AddProducts.jsx"));

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
        path: "/forgot-password",
        element: (
          <Suspense fallback={<Loader />}>
            <ForgotPassword />
          </Suspense>
        ),
      },
      {
        path: "/confirm-password",
        element: (
          <Suspense fallback={<Loader />}>
            <ConfirmPassword />
          </Suspense>
        ),
      },
      {
        path: "/change-password",
        element: (
          <Suspense fallback={<Loader />}>
            <ChangePassword />
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
        children: [
          {
            path: "/admin/dashboard",
            element: (
              <Suspense fallback={<Loader />}>
                <Graphs />
              </Suspense>
            ),
          },
          {
            path: "/admin/dashboard/allProducts",
            element: (
              <Suspense fallback={<Loader />}>
                <DashboardAllProducts />
              </Suspense>
            ),
          },
          {
            path: "/admin/dashboard/allOrders",
            element: (
              <Suspense fallback={<Loader />}>
                <DashboardOrderList />
              </Suspense>
            ),
          },
          {
            path: "/admin/dashboard/order-details",
            element: (
              <Suspense fallback={<Loader />}>
                <DashboardOrderDetail />
              </Suspense>
            ),
          },
          {
            path: "/admin/dashboard/add-products",
            element: (
              <Suspense fallback={<Loader />}>
                <AddProducts />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);

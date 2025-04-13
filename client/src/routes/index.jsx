import { useDispatch, useSelector } from "react-redux";
import { useRoutes } from "react-router-dom";
import AuthLayout from "@/components/auth/AuthLayout.jsx";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import AdminLayout from "@/components/admin-view/AdminLayout.jsx";
import AdminDashboard from "@/pages/admin-view/AdminDashboard.jsx";
import AdminProducts from "@/pages/admin-view/AdminProducts.jsx";
import AdminOrders from "@/pages/admin-view/AdminOrders.jsx";
import AdminFeatures from "@/pages/admin-view/AdminFeatures.jsx";
import ShoppingLayout from "@/components/shopping-view/ShoppingLayout.jsx";
import NotFound from "@/pages/notfound/notfound.jsx";
import ShoppingHome from "@/pages/shopping-view/ShoppingHome.jsx";
import ShoppingListing from "@/pages/shopping-view/ShoppingListing.jsx";
import ShoppingAccount from "@/pages/shopping-view/ShoppingAccount.jsx";
import ShoppingCheckOut from "@/pages/shopping-view/ShoppingCheckOut.jsx";
import CheckAuth from "@/components/common/CheckAuth.jsx";
import UnauthPage from "@/pages/unauth-page/UnauthPage.jsx";
import { useEffect } from "react";
import { checkAuth } from "@/redux/authslice/authSlice.js";
import { Skeleton } from "@/components/ui/skeleton.jsx";
import PaypalReturnPage from "@/pages/shopping-view/PaypalReturnPage.jsx";
import PaymentSuccessPage from "@/pages/shopping-view/PaymentSuccessPage.jsx";
import SearchProducts from "@/pages/shopping-view/SearchProducts.jsx";

const AppRouter = () => {
  const { user, isAuthenticated,isLoading } = useSelector((state) => state.auth);
  const dispatch=useDispatch();

  
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;

  // console.log(isLoading, user);


  const routes = useRoutes([
    {
      path: "/auth",
      element: (
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AuthLayout />
        </CheckAuth>
      ),
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ],
    },
    {
      path: "/admin",
      element: (
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AdminLayout />
        </CheckAuth>
      ),
      children: [
        { path: "dashboard", element: <AdminDashboard /> },
        { path: "products", element: <AdminProducts /> },
        { path: "orders", element: <AdminOrders /> },
        { path: "features", element: <AdminFeatures /> },
      ],
    },
    {
      path: "/shop",
      element: (
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <ShoppingLayout />
        </CheckAuth>
      ),
      children: [
        { path: "home", element: <ShoppingHome /> },
        { path: "listing", element: <ShoppingListing /> },
        { path: "account", element: <ShoppingAccount /> },
        { path: "checkout", element: <ShoppingCheckOut /> },
        {path:"paypal-return " , element:<PaypalReturnPage/>},
        {path:"payment-success", element:<PaymentSuccessPage/>},
        { path:"search" , element:<SearchProducts/>}
      ],
    },
    {
      path: "/unauth-page",
      element: <UnauthPage />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return routes;
};

export default AppRouter;

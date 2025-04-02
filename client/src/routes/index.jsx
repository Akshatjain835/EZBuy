import AuthLayout from "@/components/auth/AuthLayout.jsx";
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import AdminLayout from "@/components/admin-view/AdminLayout.jsx";
import AdminDashboard from "@/pages/admin-view/AdminDashboard.jsx";
import AdminProducts from "@/pages/admin-view/AdminProducts.jsx";
import AdminOrders from "@/pages/admin-view/AdminOrders.jsx";
import AdminFeatures from "@/pages/admin-view/AdminFeatures.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,

    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path:"/admin",
    element:<AdminLayout/>,
    children: [
        {
          path: "dashboard",
          element: <AdminDashboard />,
        },
        {
          path: "products",
          element: <AdminProducts />,
        },
        {
            path: "orders",
            element: <AdminOrders />,
          },
          {
            path: "features",
            element: <AdminFeatures />,
          },
      ],
  }
]);

export default appRouter;

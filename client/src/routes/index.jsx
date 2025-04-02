
import AuthLayout from "@/components/auth/AuthLayout.jsx";
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login.jsx"
import Register from "../pages/auth/Register.jsx"


const appRouter = createBrowserRouter([
  

    {
        path: "/auth",
        element: <AuthLayout />,

        children: [
          { 
            path: "login",
             element: <Login />
             },
          { 
            path: "register",
             element: <Register /> 
            },
        ],
      },
 

]);

export default appRouter;


import { Navigate, useLocation } from "react-router-dom";


const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();
  
  const path = location.pathname;

  // Redirect from home route
  if (path === "/") {
    if (!isAuthenticated){
      return <Navigate to="/auth/login" />;
    }
   else{
    return user?.role === "admin" ? (
      <Navigate to="/admin/dashboard" />
    ) : (
      <Navigate to="/shop/home" />
    );
   }
  }

  // Redirect if not authenticated and trying to access protected routes
  const isAuthPage = path.includes("/login") || path.includes("/register");
  if (!isAuthenticated && !isAuthPage) return <Navigate to="/auth/login" />;

  // Prevent access to auth pages if already logged in
  if (isAuthenticated && isAuthPage) {
    return user?.role === "admin" ? (
      <Navigate to="/admin/dashboard" />
    ) : (
      <Navigate to="/shop/home" />
    );
  }

  // Block non-admin users from admin routes
  if (isAuthenticated && user?.role !== "admin" && path.includes("admin")) {
    return <Navigate to="/unauth-page" />;
  }

  // Block admin users from shop routes
  if (isAuthenticated && user?.role === "admin" && path.includes("shop")) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
};

export default CheckAuth;

/*import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();
  const path = location.pathname;
  
  let redirectPath = null;
  
  // Redirect from home route
  if (path === "/") {
    if (!isAuthenticated) {
      redirectPath = "/auth/login";
    } else {
      redirectPath = user?.role === "admin" ? "/admin/dashboard" : "/shop/home";
    }
  }
  
  // Redirect if not authenticated and trying to access protected routes
  const isAuthPage = path.includes("/login") || path.includes("/register");
  if (!isAuthenticated && !isAuthPage) {
    redirectPath = "/auth/login";
  }
  
  // Prevent access to auth pages if already logged in
  if (isAuthenticated && isAuthPage) {
    redirectPath = user?.role === "admin" ? "/admin/dashboard" : "/shop/home";
  }
  
  // Block non-admin users from admin routes
  if (isAuthenticated && user?.role !== "admin" && path.includes("admin")) {
    redirectPath = "/unauth-page";
  }
  
  // Block admin users from shop routes
  if (isAuthenticated && user?.role === "admin" && path.includes("shop")) {
    redirectPath = "/admin/dashboard";
  }
  
  if (redirectPath) {
    return <Navigate to={redirectPath} />;
  }
  
  return <>{children}</>;
};

export default CheckAuth;*/
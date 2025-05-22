
import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("Please log in to access this feature");
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    // Redirect to login page and preserve the page they were trying to access
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean; // New prop to indicate if the route is admin-only
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userType = localStorage.getItem("userType"); // Get user type from localStorage
  const location = useLocation();

  console.log(`[ProtectedRoute] Path: ${location.pathname}, adminOnly: ${adminOnly}`);
  console.log(`[ProtectedRoute] isLoggedIn: ${isLoggedIn}, userType: ${userType}`);

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("Please log in to access this feature.");
      console.log("[ProtectedRoute useEffect] Redirecting to /login due to not logged in.");
    } else if (adminOnly && userType !== "admin") {
      toast.error("You do not have administrative access to this page.");
      console.log("[ProtectedRoute useEffect] Redirecting for unauthorized admin access.");
    }
  }, [isLoggedIn, adminOnly, userType]); // Added adminOnly and userType to dependency array

  if (!isLoggedIn) {
    // Redirect to login page and preserve the page they were trying to access
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // If it's an admin-only route and the user is not an admin, redirect
  if (adminOnly && userType !== "admin") {
    console.log(`[ProtectedRoute Render] Unauthorized access. Redirecting to /user-dashboard. Current userType: ${userType}`);
    // Redirect to user dashboard or home page
    return <Navigate to="/user-dashboard" replace />;
  }

  console.log("[ProtectedRoute Render] Access granted.");
  return <>{children}</>;
};

export default ProtectedRoute;
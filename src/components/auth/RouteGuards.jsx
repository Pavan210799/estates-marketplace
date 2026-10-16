import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function RequireAuth() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    return (
      <Navigate to="/login" replace state={{ from: `${location.pathname}${location.search}` }} />
    );
  }
  return <Outlet />;
}

export function GuestOnly() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (isAuthenticated) return <Navigate to={location.state?.from || "/"} replace />;
  return <Outlet />;
}

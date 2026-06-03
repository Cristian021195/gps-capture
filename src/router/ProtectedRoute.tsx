import { Navigate, Outlet } from "react-router-dom";

/**
 * solo para usuarios no logueados
 * Se usa para: login, register, forgot password
 * @returns <Outlet/>
 */
export default function ProtectedRoute() {
  const isAuthenticated = true; // luego vendrá de context o store

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
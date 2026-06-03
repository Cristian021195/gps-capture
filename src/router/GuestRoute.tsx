import { Navigate, Outlet } from "react-router-dom";

/**
 * Guard de autenticación: Este componente bloquea rutas privadas.
 * @returns <Outlet/>
 */
export default function GuestRoute() {
  const isAuthenticated = false;

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
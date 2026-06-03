import { RouterProvider } from "react-router-dom";
import { router } from "../router/routes";
import { useNetworkStatus } from "../hooks/useNetworkStatus";

export default function AppRouter() {
  useNetworkStatus();
  return <RouterProvider router={router} />
}
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import { Home } from "../pages/Home";
import { AppError } from "../pages/AppError";
import { Config } from "../pages/Config";
import { Info } from "../pages/Info";
import { Privacy } from "../pages/Privacy";
import { Instructivo } from "../pages/Instructivo";
import { Lang } from "../pages/Lang";
import { NotFound } from "../pages/NotFound";
import { Coordenadas } from "../pages/Coordenadas";
import { Ruta } from "../pages/Ruta";
import { Proveedores } from "../pages/Proovedores";
import { GestionProveedores } from "../pages/GestionProveedores";


export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/onboarding", element: <Home /> },
    ],
  },

  {
    element: <ProtectedRoute />,
    errorElement: <AppError/>,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "/", element: <Home/> },
          { path: "/config", element: <Config /> },
          { path: "/info", element: <Info /> },
          { path: "/privacy", element: <Privacy/> },
          { path: "/instructivo", element: <Instructivo/> },
          { path: "/lang", element: <Lang/> },
          { path: "/ruta", element: <Ruta/> },
          { path: "/coordenadas", element: <Coordenadas/> },
          { path: "/proveedores", element: <Proveedores/> },
          { path: "/gestion-proveedores", element: <GestionProveedores/> }
        ],
      }
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  }
]);
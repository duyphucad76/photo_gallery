import { Navigate } from "react-router-dom";
import Auth from "../pages/Auth";

const publicRoutes = [
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "*",
    element: <Navigate to="/auth" replace />,
  },
];

export default publicRoutes;

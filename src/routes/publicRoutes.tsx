import { Navigate } from "react-router-dom";
import Login from "../pages/Login";

const publicRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
];

export default publicRoutes;

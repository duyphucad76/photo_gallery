import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

const publicRoutes = [
  { path: "/login", element: <Login /> },
  { path: "*", element: <NotFound /> },
];


export default publicRoutes
import MainContent from "../components/layout/MainContent";
import Gallery from "../pages/Gallery";
import Upload from "../pages/Upload";
import type { RouteConfig } from '../utils/renderRoutes';
import { Navigate } from 'react-router-dom';
import Home from '../pages/Home';

const searchQuery = "";
const onSearchChange = () => { };

const privateRoutes: RouteConfig[] = [
  {
    path: "/",
    element: (
      <MainContent searchQuery={searchQuery} onSearchChange={onSearchChange} />
    ),
    children: [
      {
        index: true,
        element: <Home />
      },
      { path: "gallery", element: <Gallery /> },
      { path: "upload", element: <Upload /> },

    ]
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  }
];


export default privateRoutes
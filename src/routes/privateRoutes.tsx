import MainContent from "../components/layout/MainContent";
import Gallery from "../pages/Gallery";
import Upload from "../pages/Upload";
import type { RouteConfig } from '../utils/renderRoutes';
import Albums from "../pages/Albums";
import AlbumDetail from "../pages/AlbumDetail";
import Favorites from "../pages/Favorites";

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
        element: <Gallery />
      },
      { path: "albums", element: <Albums /> },
      { path: "albums/:albumId", element: <AlbumDetail /> },
      { path: "upload", element: <Upload /> },
      { path: "favorites", element: <Favorites /> },
    ]
  }
];


export default privateRoutes
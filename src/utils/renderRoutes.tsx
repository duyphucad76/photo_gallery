import type { JSX } from 'react';
import { Route } from "react-router-dom";

export interface RouteConfig {
  path?: string;
  index?: true;
  element: JSX.Element;
  children?: RouteConfig[];
}


const renderRoutes = (routes: RouteConfig[]) =>
  routes.map((route, i) => {
    if (route.index) {
      return <Route key={i} index element={route.element} />;
    }

    return (
      <Route key={i} path={route.path} element={route.element}>
        {route.children && renderRoutes(route.children)}
      </Route>
    );
  });



export default renderRoutes;

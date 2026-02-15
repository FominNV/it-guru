import { createBrowserRouter, Navigate, type RouteObject } from "react-router";

export const ROUTER_PATHS = {
  HOME: "/",
  LANDING: "/landing",
  LOGIN: "/login",
};

const routes: RouteObject[] = [
  {
    path: ROUTER_PATHS.HOME,
    element: <Navigate to={ROUTER_PATHS.LANDING} replace={true} />,
  },
  {
    path: ROUTER_PATHS.LANDING,
    element: <div>Landing</div>,
  },
  {
    path: ROUTER_PATHS.LOGIN,
    element: <div>Login</div>,
  },
];

export const router = createBrowserRouter(routes);

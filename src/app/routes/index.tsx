import { createBrowserRouter, Navigate } from "react-router";
import type { RouteObject } from "react-router";
import { LandingPage } from "@/pages/landing";
import { LoginPage } from "@/pages/login";
import { ROUTER_PATHS } from "@/shared/constants";
import { ProtectedRoute, PublicOnlyRoute } from "./guards";

const routes: RouteObject[] = [
  {
    path: ROUTER_PATHS.HOME,
    element: <Navigate to={ROUTER_PATHS.LANDING} replace={true} />,
  },
  {
    path: ROUTER_PATHS.LANDING,
    element: (
      <ProtectedRoute>
        <LandingPage />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTER_PATHS.LOGIN,
    element: (
      <PublicOnlyRoute>
        <LoginPage />
      </PublicOnlyRoute>
    ),
  },
];

export const router = createBrowserRouter(routes);


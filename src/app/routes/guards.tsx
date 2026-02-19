import type { FC } from "react";
import { Navigate } from "react-router";
import { ROUTER_PATHS } from "@/shared/constants";
import { getStoredToken } from "@/shared/lib";

export const ProtectedRoute: FC<IParentComponent> = ({ children }) => {
  const token = getStoredToken();

  if (!token) {
    return <Navigate to={ROUTER_PATHS.LOGIN} replace={true} />;
  }

  return children;
};

export const PublicOnlyRoute: FC<IParentComponent> = ({ children }) => {
  const token = getStoredToken();

  if (token) {
    return <Navigate to={ROUTER_PATHS.LANDING} replace={true} />;
  }

  return children;
};

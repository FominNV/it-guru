import type { FC } from "react";
import "./MainLayout.scss";

export const MainLayout: FC<IParentComponent> = ({ children }) => (
  <div className="main-layout">{children}</div>
);

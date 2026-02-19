import type { FC } from "react";
import "./MainContainer.scss";

export const MainContainer: FC<IParentComponent> = ({ children }) => {
  return <div className="main-container">{children}</div>;
};

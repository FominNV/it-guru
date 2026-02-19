import type { FC } from "react";
import { ConfigProvider } from "antd";
import { Provider as StoreProvider } from "react-redux";
import { RouterProvider } from "react-router";
import { store } from "@/shared/store";
import { router } from "./routes";

export const App: FC = () => {
  return (
    <StoreProvider store={store}>
      <ConfigProvider>
        <RouterProvider router={router} />
      </ConfigProvider>
    </StoreProvider>
  );
};

export default App;

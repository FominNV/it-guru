import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./auth/authApi";
import { productsApi } from "./products/productsApi";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware, authApi.middleware),
});

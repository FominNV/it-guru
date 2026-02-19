import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "../config";
import type { PaginateListType } from "../types";
import type { IProductData } from "./types";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
  }),
  endpoints: (builder) => ({
    getProductList: builder.query<
      PaginateListType<"products", IProductData>,
      void
    >({
      query: () => "/products",
    }),
    searchProducts: builder.query<
      PaginateListType<"products", IProductData>,
      string
    >({
      query: (search) => ({
        url: "/products/search",
        params: { q: search },
      }),
    }),
  }),
});

export const { useGetProductListQuery, useSearchProductsQuery } = productsApi;

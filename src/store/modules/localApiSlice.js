import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { localCart } from "../../utils/objects";

export const localFakeShopApi = createApi({
  reducerPath: "localFakeShopApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    postCart: builder.mutation({
      query: (cart) => ({
        url: "/cart",
        method: "POST",
        body: cart,
      }),
    }),
    getCart: builder.query({
      query: () => "/cart",
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/cart/products/${productId}`,
        method: "DELETE",
      }),
    }),
    postProduct: builder.mutation({
      query: (productId) => ({
        url: `/cart/products/${productId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  usePostCartMutation,
  useLazyGetCartQuery,
  useGetCartQuery,
  useDeleteProductMutation,
  usePostProductMutation,
} = localFakeShopApi;

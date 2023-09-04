import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { localCart } from "../../utils/objects";

export const localFakeShopApi = createApi({
  reducerPath: "localFakeShopApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => "/cart",
      providesTags: ["Cart"],
    }),

    postCart: builder.mutation({
      query: (cart) => ({
        url: "/cart",
        method: "POST",
        body: cart,
      }),
      invalidatesTags: ["Cart"],
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/cart/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    postOrder: builder.mutation({
      query: (order) => ({
        url: `/orders`,
        method: "POST",
        body: order,
      }),
      // invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  usePostCartMutation,
  useLazyGetCartQuery,
  useGetCartQuery,
  useDeleteProductMutation,
  usePostOrderMutation,
} = localFakeShopApi;

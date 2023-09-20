import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { changeLastOrderId } from "./lastOrderIdSlice";

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
      invalidatesTags: ["Cart"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data: orderData } = await queryFulfilled;
        dispatch(changeLastOrderId(orderData.id));
      },
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

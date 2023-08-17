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
  }),
});

export const { usePostCartMutation, useLazyGetCartQuery } = localFakeShopApi;

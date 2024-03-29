import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { changeLastOrderId, changeOrderId } from './mixed-purpose-slice';

export const localFakeShopApi = createApi({
  reducerPath: 'localFakeShopApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    getSpecificCart: builder.query({
      query: (userId) => `/carts/specific-cart?userId=${userId}`,
      providesTags: ['Cart'],
      method: 'GET',
    }),

    addProductToCart: builder.mutation({
      query: (neededData) => ({
        url: '/carts',
        method: 'PUT',
        body: neededData,
      }),
      invalidatesTags: ['Cart'],
    }),
    createEmptyCart: builder.mutation({
      query: (neededData) => ({
        url: '/carts',
        method: 'POST',
        body: neededData,
      }),
      invalidatesTags: ['Cart'],
    }),

    deleteProductOrAllProductsInCart: builder.mutation({
      query: (neededData) => ({
        url: '/carts/specific-cart',
        method: 'PUT',
        body: neededData,
      }),
      invalidatesTags: ['Cart'],
    }),

    decreaseProductQuantity: builder.mutation({
      query: (neededData) => ({
        url: '/carts/specific-cart',
        method: 'PATCH',
        body: neededData,
      }),
      invalidatesTags: ['Cart'],
    }),

    getOrder: builder.query({
      query: (orderId) => `/orders/${orderId}`,
      providesTags: ['Cart'],
      method: 'GET',
    }),

    addOrder: builder.mutation({
      query: (neededData) => ({
        url: '/orders',
        method: 'POST',
        body: neededData,
      }),
      invalidatesTags: ['Cart'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data: orderData } = await queryFulfilled;
        // eslint-disable-next-line no-underscore-dangle
        dispatch(changeLastOrderId(orderData.order._id));
        // eslint-disable-next-line no-underscore-dangle
        dispatch(changeOrderId(orderData.order._id));
      },
    }),
  }),
});

export const {
  useCreateEmptyCartMutation,
  useAddProductToCartMutation,
  useGetSpecificCartQuery,
  useLazyGetSpecificCartQuery,
  useDeleteProductOrAllProductsInCartMutation,
  useDecreaseProductQuantityMutation,
  useAddOrderMutation,
  useLazyGetOrderQuery,
} = localFakeShopApi;

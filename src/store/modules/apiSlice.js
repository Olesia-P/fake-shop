import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useSelector } from "react-redux";

export const fakeShopApi = createApi({
  reducerPath: "fakeShopApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/" }),
  endpoints: (builder) => ({
    getOneProduct: builder.query({
      query: (productId) => `products/${productId}`,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data: oneProductData } = await queryFulfilled;
      },
    }),
    getProducts: builder.query({
      query: ({ category, filter }) => {
        return {
          url: category === "" ? `products` : `products/category/${category}`,
          params: {
            limit: filter.limit,
            sort: filter.alphabet,
          },
        };
      },
      // async onQueryStarted(_, { dispatch, queryFulfilled }) {
      // const { data: productsData } = await queryFulfilled;
    }),
    getCategories: builder.query({
      query: (params) => `products/categories`,
      transformResponse: (response) => {
        const categoriesObject = response.map((category) => ({
          name: category,
          link: encodeURI(category),
        }));
        const transformedCategories = [
          ...categoriesObject,
          { name: "all products", link: "" },
        ];
        return transformedCategories;
      },
    }),
  }),
});

export const {
  useGetOneProductQuery,
  useGetProductsQuery,
  useGetCategoriesQuery,
} = fakeShopApi;

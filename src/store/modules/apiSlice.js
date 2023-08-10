import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
  }),
});

export const { useGetOneProductQuery, useGetProductsQuery } = fakeShopApi;

// getAllProducts: builder.query({
//   query: () => "products",
//   async onQueryStarted(_, { dispatch, queryFulfilled }) {
//     const { data: allProductsData } = await queryFulfilled;
//   },
// }),
// getCategory: builder.query({
//   query: (category) => `products/category/${category}`,
//   async onQueryStarted(_, { dispatch, queryFulfilled }) {
//     const { data: categoryData } = await queryFulfilled;
//   },
// }),
//  getFromCategoryElectronics: builder.query({
//       query: () => "products/category/electronics",
//       async onQueryStarted(_, { dispatch, queryFulfilled }) {
//         const { data: categoryData } = await queryFulfilled;
//       },
//     }),
//  getFromCategoryJewelery: builder.query({
//       query: () => "products/category/jewelery",
//       async onQueryStarted(_, { dispatch, queryFulfilled }) {
//         const { data: jeweleryProductsData } = await queryFulfilled;
//       },
//     }),
//     getFromCategoryMenClothing: builder.query({
//       query: () => "products/category/men's%20clothing",
//       async onQueryStarted(_, { dispatch, queryFulfilled }) {
//         const { data: menClothingProductsData } = await queryFulfilled;
//       },
//     }),
//     getFromCategoryWomenClothing: builder.query({
//       query: () => "products/category/women's%20clothing",
//       async onQueryStarted(_, { dispatch, queryFulfilled }) {
//         const { data: womenClothingProductsData } = await queryFulfilled;
//       },
//     }),
//  getAllProducts: builder.query({
//     query: () => "products",
//     async onQueryStarted(_, { dispatch, queryFulfilled }) {
//       const { data: allProductsData } = await queryFulfilled;
//     },
//   }),
//   getCategory: builder.query({
//     query: (category) => `products/category/${category}`,
//     async onQueryStarted(_, { dispatch, queryFulfilled }) {
//       const { data: electronicsProductsData } = await queryFulfilled;
//     },
//   }),

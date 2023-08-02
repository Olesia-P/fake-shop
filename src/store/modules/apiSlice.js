import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const fakeShopApi = createApi({
  reducerPath: "fakeShopApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "products",
    }),
    getFromCategoryElectronics: builder.query({
      query: () => "products/category/electronics",
    }),
    getFromCategoryJewelery: builder.query({
      query: () => "products/category/jewelery",
    }),
    getFromCategoryMenClothing: builder.query({
      query: () => "products/category/men's%20clothing",
    }),
    getFromCategoryWomenClothing: builder.query({
      query: () => "products/category/women's%20clothing",
    }),
    getOneProduct: builder.query({
      query: () => "products/1",
    }),
  }),
});

export const {
  useLazyGetAllProductsQuery,

  useGetAllProductsQuery,
  useGetFromCategoryElectronicsQuery,
  useGetFromCategoryJeweleryQuery,
  useGetFromCategoryMenClothingQuery,
  useGetFromCategoryWomenClothingQuery,
  useGetOneProductQuery,
} = fakeShopApi;

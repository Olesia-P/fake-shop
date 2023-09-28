import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const fakeShopApi = createApi({
  reducerPath: 'fakeShopApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
  endpoints: (builder) => ({
    getOneProduct: builder.query({
      query: (productId) => `products/${productId}`,
    }),
    getProducts: builder.query({
      query: ({ category, filter }) => {
        return {
          url: category === '' ? 'products' : `products/category/${category}`,
          params: {
            limit: filter.limit,
            sort: filter.alphabet,
          },
        };
      },
    }),
    getCategories: builder.query({
      query: () => 'products/categories',
      transformResponse: (response) => {
        const categoriesObject = response.map((category) => ({
          name: category,
          link: encodeURI(category),
        }));
        const transformedCategories = [
          { name: 'all products', link: '' },
          ...categoriesObject,
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

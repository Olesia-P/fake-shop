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
            // sort: filter.alphabet,
            // api stopped filtering by alphabet
            // alphabet sorting is now implemented in transformResponse
          },
        };
      },
      transformResponse: (response, queryApi, originalRequest) => {
        // Sort the products alphabetically by title
        const sortedProducts = response.slice(); // create a copy to avoid mutating the original array

        if (originalRequest.filter.alphabet === 'asc') {
          // use filter from query
          sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        } else if (originalRequest.filter.alphabet === 'desc') {
          sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
        }

        return sortedProducts;
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

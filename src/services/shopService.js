import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { dbUrl } from "../database/realtimeDB";

export const shopApi = createApi({
	reducerPath: "shopApi",
	baseQuery: fetchBaseQuery({ baseUrl: dbUrl }),
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: () => "products.json",
		}),
		getCategories: builder.query({
			query: () => "categories.json",
		}),
		getProductsByCategory: builder.query({
			query: (category) => `products.json?orderBy="category"&equalTo="${category}"`,
			transformResponse: (response) => {
				const responseTransformed = Object.values(response);
				return responseTransformed;
			},
		}),
		getProductById: builder.query({
			query: (productId) => `products.json?orderBy="id"&equalTo=${productId}`,
			transformResponse: (response) => {
				const responseTransformed = Object.values(response);
				if (responseTransformed.length) return responseTransformed[0];
				return null;
			},
		}),
	}),
});

export const { useGetProductsQuery, useGetCategoriesQuery, useGetProductsByCategoryQuery, useGetProductByIdQuery } = shopApi;

import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../service/apiClient';

// Fetch articles with pagination support
export const fetchArticles = createAsyncThunk(
	'articles/fetchAll',
	async ({ page = 1, pageSize = 20 } = {}, { rejectWithValue }) => {
		try {
			const data = await apiClient(
				`/news/articles/?page=${page}&page_size=${pageSize}`
			);

			// Pick only the required fields
			const filteredData = data?.results.map((article) => ({
				id: article.id,
				title: article.title,
				slug: article.slug,
				summary: article.summary,
				banner_image: article.banner_image,
				category: article.category,
				category_name: article.category_name,
				author: article.author,
				published_at: article.published_at,
			}));

			return {
				articles: filteredData,
				pagination: {
					page: data.page,
					pageSize: data.page_size,
					totalPages: data.total_pages,
					totalItems: data.total_items,
				},
			};
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

// Fetch single article by ID (keep as is)
export const fetchArticleById = createAsyncThunk(
	'articles/fetchById',
	async (id, { rejectWithValue }) => {
		try {
			const data = await apiClient(`/news/articles/${id}/`);
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

// Fetch articles by category with pagination
export const fetchArticlesByCategory = createAsyncThunk(
	'articles/fetchByCategory',
	async ({ categoryId, page = 1, pageSize = 20 }, { rejectWithValue }) => {
		try {
			const data = await apiClient(
				`/news/categories/${categoryId}/articles/?page=${page}&page_size=${pageSize}`
			);
			return {
				articles: data.results,
				pagination: {
					page: data.page || page,
					pageSize: data.page_size || pageSize,
					totalPages: data.total_pages || 1,
					totalItems: data.total_items || data.results.length,
				},
			};
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

// Fetch single article by ID (keep as is)
export const fetchArticleByCategorySlug = createAsyncThunk(
	'articles/fetchByCategorySlug',
	async (categorySlug, { rejectWithValue }) => {
		try {
			const data = await apiClient(`/news/articles/?slug=${categorySlug}`);
			return data?.results[0];
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

// Fetch single article by ID (keep as is)
export const fetchArticlesByTag = createAsyncThunk(
	'articles/fetchByTag',
	async ({ tag, page = 1, pageSize = 20 }, { rejectWithValue }) => {
		try {
			const data = await apiClient(
				`/news/articles/?tag=${tag}&page=${page}&page_size=${pageSize}`
			);
			const filteredData = data?.results.map((article) => ({
				id: article.id,
				title: article.title,
				slug: article.slug,
				summary: article.summary,
				banner_image: article.banner_image,
				category: article.category,
				category_name: article.category_name,
				author: article.author,
				published_at: article.published_at,
			}));

			return {
				articles: filteredData,
				pagination: {
					page: data.page,
					pageSize: data.page_size,
					totalPages: data.total_pages,
					totalItems: data.total_items,
				},
			};
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

// Search with pagination
export const fetchArticlesBySearch = createAsyncThunk(
	'articles/fetchBySearch',
	async ({ searchQuery, page = 1, pageSize = 20 }, { rejectWithValue }) => {
		try {
			const data = await apiClient(
				`/news/articles/?search=${searchQuery}&page=${page}&page_size=${pageSize}`
			);

			const filteredData = data?.results.map((article) => ({
				id: article.id,
				title: article.title,
				slug: article.slug,
				summary: article.summary,
				banner_image: article.banner_image,
				category: article.category,
				author: article.author,
			}));

			return {
				articles: filteredData,
				pagination: {
					page: data.page,
					pageSize: data.page_size,
					totalPages: data.total_pages,
					totalItems: data.total_items,
				},
			};
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

// NEW: Fetch featured/trending articles only (for homepage)
export const fetchFeaturedArticles = createAsyncThunk(
	'articles/fetchFeatured',
	async (_, { rejectWithValue }) => {
		try {
			// Assuming your API supports filtering by tag
			const data = await apiClient('/news/articles/?tag=featured&page_size=10');

			const filteredData = data?.results.map((article) => ({
				id: article.id,
				title: article.title,
				slug: article.slug,
				summary: article.summary,
				banner_image: article.banner_image,
				category: article.category,
			}));

			return filteredData;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

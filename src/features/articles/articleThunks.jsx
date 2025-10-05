import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../service/apiClient';

export const fetchArticles = createAsyncThunk(
	'articles/fetchAll',
	async (_, { rejectWithValue }) => {
		try {
			const data = await apiClient('/news/articles/');

			// Pick only the required fields
			const filteredData = data?.results.map((article) => ({
				id: article.id,
				title: article.title,
				slug: article.slug,
				summary: article.summary,
				banner_image: article.banner_image,
				category: article.category,
				subcategory: article.subcategory,
			}));

			return filteredData;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

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

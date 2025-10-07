import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../service/apiClient';

export const fetchCategories = createAsyncThunk(
	'categories/fetchAll',
	async (_, { rejectWithValue }) => {
		try {
			const data = await apiClient('/news/categories/');
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const fetchCategoryById = createAsyncThunk(
	'categories/fetchById',
	async (id, { rejectWithValue }) => {
		try {
			const data = await apiClient(`/news/categories/${id}`);
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

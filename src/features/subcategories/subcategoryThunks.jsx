import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../service/apiClient';

export const fetchSubcategories = createAsyncThunk(
	'subcategories/fetchAll',
	async (_, { rejectWithValue }) => {
		try {
			const data = await apiClient('/news/subcategories/');
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const fetchSubcategoryById = createAsyncThunk(
	'subcategories/fetchById',
	async (id, { rejectWithValue }) => {
		try {
			const data = await apiClient(`/news/subcategories/${id}`);
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

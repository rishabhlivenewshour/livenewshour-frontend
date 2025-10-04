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

// NEW: Composite thunk that fetches categories with subcategories
export const fetchCategoriesWithSubcategories = createAsyncThunk(
	'categories/fetchWithSubcategories',
	async (_, { rejectWithValue }) => {
		try {
			// Step 1: Fetch all categories
			const categories = await apiClient('/news/categories/');

			// Step 2: Fetch subcategories for all categories in parallel
			const categoriesWithSubcategories = await Promise.allSettled(
				categories.map(async (category) => {
					try {
						const subcategoriesData = await apiClient(
							`/news/categories/${category.id}/subcategories`
						);
						const subcategories = Array.isArray(subcategoriesData)
							? subcategoriesData
							: [subcategoriesData];
						return {
							...category,
							subcategories,
						};
					} catch (error) {
						if (!error.message?.includes('404')) {
							console.warn(
								`Failed to fetch subcategories for category ${category.id}:`,
								error
							);
						}
						return {
							...category,
							subcategories: [],
						};
					}
				})
			);

			// Extract values from Promise.allSettled results
			return categoriesWithSubcategories.map((result) => result.value);
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

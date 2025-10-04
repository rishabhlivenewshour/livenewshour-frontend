import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
	name: 'categories',
	initialState: {
		categories: [],
		loading: false,
		error: null,
	},
	extraReducers: (builder) => {
		builder.addCase('categories/fetchAll/pending', (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase('categories/fetchAll/fulfilled', (state, action) => {
			state.categories = action.payload.map((cat) => ({
				...cat,
				subcategories: [],
			}));
			state.loading = false;
		});
		builder.addCase('categories/fetchAll/rejected', (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});

		builder.addCase('categories/fetchById/pending', (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase('categories/fetchById/fulfilled', (state) => {
			state.loading = false;
		});
		builder.addCase('categories/fetchById/rejected', (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});

		builder.addCase('categories/fetchWithSubcategories/pending', (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(
			'categories/fetchWithSubcategories/fulfilled',
			(state, action) => {
				state.categories = action.payload;
				state.loading = false;
			}
		);
		builder.addCase(
			'categories/fetchWithSubcategories/rejected',
			(state, action) => {
				state.loading = false;
				state.error = action.payload;
			}
		);
	},
});

export default categorySlice.reducer;

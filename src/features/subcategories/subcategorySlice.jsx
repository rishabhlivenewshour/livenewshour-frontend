import { createSlice } from '@reduxjs/toolkit';

const subcatgorySlice = createSlice({
	name: 'subcategories',
	initialState: {
		subcategories: [],
		loading: false,
		error: null,
	},
	extraReducers: (builder) => {
		builder.addCase('subcategories/fetchAll/pending', (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase('subcategories/fetchAll/fulfilled', (state, action) => {
			state.subcategories = action.payload;
			state.loading = false;
		});
		builder.addCase('subcategories/fetchAll/rejected', (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});

		builder.addCase('subcategories/fetchById/pending', (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase('subcategories/fetchById/fulfilled', (state) => {
			state.loading = false;
		});
		builder.addCase('subcategories/fetchById/rejected', (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
	},
});

export default subcatgorySlice.reducer;

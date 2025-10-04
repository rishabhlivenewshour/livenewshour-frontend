import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	articles: [],
	loading: false,
	error: null,
};

const articleSlice = createSlice({
	name: 'articles',
	initialState,
	extraReducers: (builder) => {
		// for fetch articles
		builder.addCase('articles/fetchAll/pending', (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase('articles/fetchAll/fulfilled', (state, action) => {
			state.articles = action.payload;
			state.loading = false;
		});
		builder.addCase('articles/fetchAll/rejected', (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});

		// for fetchArticleById
		builder.addCase('articles/fetchById/pending', (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase('articles/fetchById/fulfilled', (state) => {
			state.loading = false;
		});
		builder.addCase('articles/fetchById/rejected', (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
	},
});

export default articleSlice.reducer;

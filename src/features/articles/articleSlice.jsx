import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	articles: [],
	featuredArticles: [],
	articlesByCategory: [],
	searchResults: [],
	pagination: {
		page: 1,
		pageSize: 20,
		totalPages: 1,
		totalItems: 0,
	},
	categoryPagination: {
		page: 1,
		pageSize: 20,
		totalPages: 1,
		totalItems: 0,
	},
	searchPagination: {
		page: 1,
		pageSize: 20,
		totalPages: 1,
		totalItems: 0,
	},
	loading: false,
	error: null,
	// Cache for individual articles
	articlesCache: {},
};

const articleSlice = createSlice({
	name: 'articles',
	initialState,
	reducers: {
		clearSearchResults: (state) => {
			state.searchResults = [];
			state.searchPagination = initialState.searchPagination;
		},
		clearCategoryArticles: (state) => {
			state.articlesByCategory = [];
			state.categoryPagination = initialState.categoryPagination;
		},
		// Cache individual article
		cacheArticle: (state, action) => {
			const article = action.payload;
			state.articlesCache[article.id] = article;
		},
	},
	extraReducers: (builder) => {
		// Fetch articles with pagination
		builder.addCase('articles/fetchAll/pending', (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase('articles/fetchAll/fulfilled', (state, action) => {
			const { articles, pagination } = action.payload;

			// Replace articles instead of accumulating
			state.articles = articles;
			state.pagination = pagination;
			state.loading = false;
		});
		builder.addCase('articles/fetchAll/rejected', (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});

		// Fetch featured articles
		builder.addCase('articles/fetchFeatured/fulfilled', (state, action) => {
			state.featuredArticles = action.payload;
		});

		// Fetch article by ID
		builder.addCase('articles/fetchById/pending', (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase('articles/fetchById/fulfilled', (state, action) => {
			state.loading = false;
			// Cache the article
			state.articlesCache[action.payload.id] = action.payload;
		});
		builder.addCase('articles/fetchById/rejected', (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});

		// Fetch articles by category id
		builder.addCase('articles/fetchByCategory/pending', (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase('articles/fetchByCategory/fulfilled', (state, action) => {
			const { articles, pagination } = action.payload;
			state.articlesByCategory = articles;
			state.categoryPagination = pagination;
			state.loading = false;
		});
		builder.addCase('articles/fetchByCategory/rejected', (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});

		// Fetch articles by category slug
		builder.addCase('articles/fetchByCategorySlug/pending', (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase('articles/fetchByCategorySlug/fulfilled', (state) => {
			state.loading = false;
		});
		builder.addCase(
			'articles/fetchByCategorySlug/rejected',
			(state, action) => {
				state.loading = false;
				state.error = action.payload;
			}
		);

		// Search articles
		builder.addCase('articles/fetchBySearch/pending', (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase('articles/fetchBySearch/fulfilled', (state, action) => {
			const { articles, pagination } = action.payload;
			state.searchResults = articles;
			state.searchPagination = pagination;
			state.loading = false;
		});
		builder.addCase('articles/fetchBySearch/rejected', (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
	},
});

export const { clearSearchResults, clearCategoryArticles, cacheArticle } =
	articleSlice.actions;
export default articleSlice.reducer;

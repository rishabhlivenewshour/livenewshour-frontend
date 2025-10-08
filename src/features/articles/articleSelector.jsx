export const selectArticles = (state) => state.articles.articles;
export const selectFeaturedArticles = (state) =>
	state.articles.featuredArticles;
export const selectArticlesByCategory = (state) =>
	state.articles.articlesByCategory;
export const selectSearchResults = (state) => state.articles.searchResults;

export const selectPagination = (state) => state.articles.pagination;
export const selectCategoryPagination = (state) =>
	state.articles.categoryPagination;
export const selectSearchPagination = (state) =>
	state.articles.searchPagination;

export const selectArticlesLoading = (state) => state.articles.loading;
export const selectArticlesError = (state) => state.articles.error;

// Get cached article by ID
export const selectArticleById = (state, articleId) =>
	state.articles.articlesCache[articleId];

// Check if article is in cache
export const selectIsArticleCached = (state, articleId) =>
	Boolean(state.articles.articlesCache[articleId]);

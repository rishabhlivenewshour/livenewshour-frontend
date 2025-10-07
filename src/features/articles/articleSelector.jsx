export const selectArticles = (state) => state.articles.articles;
export const selectArticlesByCategory = (state) =>
	state.articles.articlesByCategory;
export const selectArticlesLoading = (state) => state.articles.loading;
export const selectArticlesError = (state) => state.articles.error;

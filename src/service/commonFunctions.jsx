export const getCategoryNameById = (categories, categoryId) => {
	return categories.find((cat) => cat.id === categoryId)?.name;
};

export const getSubcategoryNameById = (subcategories, subcategoryId) => {
	return subcategories.find((subcat) => subcat.id === subcategoryId)?.name;
};

export const getAllArticlesByCategory = (articles, categoryId) => {
	const filteredArticles = articles.filter(
		(article) => article.category === categoryId
	);
	return filteredArticles;
};

import { combineReducers } from '@reduxjs/toolkit';
import articleReducer from '../features/articles/articleSlice';
import categoryReducer from '../features/categories/categorySlice';
import subcategoryReducer from '../features/subcategories/subcategorySlice';

const rootReducer = combineReducers({
	articles: articleReducer,
	categories: categoryReducer,
	subcategories: subcategoryReducer,
});

export default rootReducer;

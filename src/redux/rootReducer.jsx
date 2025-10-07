import { combineReducers } from '@reduxjs/toolkit';
import articleReducer from '../features/articles/articleSlice';
import categoryReducer from '../features/categories/categorySlice';

const rootReducer = combineReducers({
	articles: articleReducer,
	categories: categoryReducer,
});

export default rootReducer;

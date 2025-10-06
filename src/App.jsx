import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './utils/ScrollToTop';
import ArticlePage from './pages/ArticlePage';
import ArticlesByCatgeoryPage from './pages/ArticlesByCatgeoryPage';
import ArticlesBySubcatgeoryPage from './pages/ArticlesBySubcategoryPage';
import { useEffect } from 'react';
import { fetchCategoriesWithSubcategories } from './features/categories/categoryThunks';
import { useDispatch } from 'react-redux';
import { fetchSubcategories } from './features/subcategories/subcategoryThunks';
import { fetchArticles } from './features/articles/articleThunks';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCategoriesWithSubcategories());
		dispatch(fetchSubcategories());
	}, [dispatch]);

	useEffect(() => {
		dispatch(fetchArticles());

		const interval = setInterval(() => {
			dispatch(fetchArticles());
		}, 120 * 1000); // 120 seconds

		return () => clearInterval(interval);
	}, [dispatch]);

	return (
		<BrowserRouter>
			<ScrollToTop />
			<div className='fixed w-[100vw] mt-[-64px] lg:mt-[-106px] z-[999]'>
				<Navbar />
			</div>
			<div className='mt-[64px] lg:mt-[106px] px-[5vw] sm:px-[15vw]'>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route
						path='/news/:category_slug'
						element={<ArticlesByCatgeoryPage />}
					/>
					<Route
						path='/news/:category_slug/:subcategory_slug'
						element={<ArticlesBySubcatgeoryPage />}
					/>
					<Route
						path='/news/articles/:article_slug'
						element={<ArticlePage />}
					/>
					<Route path='/search' element={<SearchPage />} />
					<Route
						path='*'
						element={
							<p className='w-[100%] h-[280px] flex justify-center items-center text-2xl tracking-widest text-light font-semibold'>
								Coming soon...
							</p>
						}
					/>
				</Routes>
			</div>
			<Footer />
		</BrowserRouter>
	);
}

export default App;

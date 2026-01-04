import { useEffect, Suspense, lazy, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './utils/ScrollToTop';
import BackToTop from './components/layout/BackToTop';
import { fetchCategories } from './features/categories/categoryThunks';
import { onNetworkChange, getNetworkInfo } from './utils/networkDetection';
import ErrorBoundary from './components/error/ErrorBoundary';
import { LoaderIcon } from './components/common/Icons';

// ✅ Lazy load route components
const HomePage = lazy(() => import('./pages/HomePage'));
const ArticlePage = lazy(() => import('./pages/ArticlePage'));
const ArticlesByCategoryPage = lazy(() =>
	import('./pages/ArticlesByCatgeoryPage')
);
const ArticlesByTagPage = lazy(() => import('./pages/ArticlesByTagPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));

// Optional: lightweight loading screen
const LoaderComponent = () => (
	<div className='w-full h-screen flex justify-center items-center '>
		<LoaderIcon className='animate-spin text-red-600 mx-auto mb-4' size={48} />
	</div>
);

function App() {
	const dispatch = useDispatch();
	const [isAppReady, setIsAppReady] = useState(false);

	// Fetch categories once
	useEffect(() => {
		const loadData = async () => {
			try {
				await Promise.all([
					dispatch(fetchCategories()), // You can add more initial data fetches here
				]);
			} catch (err) {
				console.error('⚠️ Initial data load failed:', err);
			} finally {
				setIsAppReady(true);
			}
		};
		loadData();
	}, [dispatch]);

	// Monitor network status
	useEffect(() => {
		const networkInfo = getNetworkInfo();
		console.log('📡 Network Info:', networkInfo);

		const unsubscribe = onNetworkChange((info) => {
			console.log('📡 Network changed:', info);
			if (info.saveData) {
				console.log('💾 Data saver mode is enabled');
			}
		});

		return () => {
			if (unsubscribe) unsubscribe();
		};
	}, []);

	if (!isAppReady) return <LoaderComponent />;

	return (
		<ErrorBoundary>
			<BrowserRouter>
				<ScrollToTop />
				<BackToTop />

				{/* Fixed Navbar */}
				<div className='fixed w-[100vw] mt-[-64px] lg:mt-[-106px] z-[999]'>
					<Navbar />
				</div>

				{/* Page Container */}
				<div className='mt-[64px] lg:mt-[106px] px-[5vw] sm:px-[14vw]'>
					<Suspense fallback={<LoaderComponent />}>
						<Routes>
							<Route path='/' element={<HomePage />} />
							<Route
								path='/news/topics/:category_slug'
								element={<ArticlesByCategoryPage />}
							/>
							<Route path='/news/:tag' element={<ArticlesByTagPage />} />
							<Route
								path='/news/articles/:article_slug'
								element={<ArticlePage />}
							/>
							<Route path='/search' element={<SearchPage />} />
							<Route
								path='*'
								element={
									<p className='w-full h-[280px] flex justify-center items-center text-2xl tracking-widest text-light font-semibold'>
										Coming soon...
									</p>
								}
							/>
						</Routes>
					</Suspense>
				</div>

				<Footer />
			</BrowserRouter>
		</ErrorBoundary>
	);
}

export default App;

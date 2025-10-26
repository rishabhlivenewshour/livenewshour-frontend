import { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import NewsFeed from '../components/NewsFeed';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectArticles,
	selectArticlesError,
	selectArticlesLoading,
} from '../features/articles/articleSelector';
import NewsFeedByCategory from '../components/NewsFeedByCategory';
import { selectCategories } from '../features/categories/categorySelector';
import { fetchArticles } from '../features/articles/articleThunks';
import { Loader } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const HomePage = () => {
	const dispatch = useDispatch();
	const articles = useSelector(selectArticles);
	const categories = useSelector(selectCategories);
	const articlesError = useSelector(selectArticlesError);
	const articlesLoading = useSelector(selectArticlesLoading);

	// Fetch only first page of articles (20-30 articles)
	useEffect(() => {
		if (articles.length === 0) {
			dispatch(fetchArticles({ page: 1, pageSize: 30 }));
		}
	}, [dispatch, articles.length]);

	// Loading state
	if (articlesLoading && articles.length === 0) {
		return (
			<div className='min-h-screen bg-gray-50 flex items-center justify-center'>
				<div className='text-center'>
					<Loader
						className='animate-spin text-red-600 mx-auto mb-4'
						size={48}
					/>
					<p className='text-gray-600 font-semibold'>Loading articles...</p>
				</div>
			</div>
		);
	}

	// Error state
	if (articlesError || articles.length === 0) {
		return (
			<div className='min-h-screen bg-gray-50 flex items-center justify-center'>
				<div className='text-center max-w-md'>
					<div className='text-6xl mb-4'>📰</div>
					<h2 className='text-2xl font-bold text-gray-800 mb-2'>
						No Articles Found
					</h2>
					<p className='text-gray-600 mb-6'>
						{'The articles do not exist. Kindly revisit after some time.'}
					</p>
				</div>
			</div>
		);
	}

	const total_categories = categories.length;

	return (
		<>
			<SEOHead
				title='Latest News, Breaking Headlines, and Live Updates'
				url='/'
				type='website'
			/>
			<div className='pt-10'>
				<div>
					<h1 className='text-3xl font-semibold tracking-wider text-dark border-l-4 border-primary py-1.5 px-5 pt-3 uppercase'>
						Headlines
					</h1>
					<HeroSection />
				</div>
				<br className='h-[2px] bg-gray-200 w-full my-10'></br>
				<div className='flex flex-col lg:flex-row gap-5 pt-5 pb-16'>
					<div className='w-full lg:w-[20%] flex flex-row lg:flex-col flex-wrap lg:flex-nowrap gap-20 order-2 lg:order-1'>
						{categories
							.slice(Math.floor(total_categories / 2))
							.map((category) => (
								<NewsFeedByCategory key={category.id} category={category} />
							))}
					</div>
					<div className='w-full lg:w-[60%] order-1 lg:order-2'>
						<NewsFeed
							heading='Latest Stories'
							newsArray={articles.slice(1, 7)}
						/>
						<p className='h-[2px] bg-gray-200 w-full my-10'></p>
						<NewsFeed heading='Most Read' newsArray={articles.slice(7, 12)} />
					</div>
					<div className='w-full lg:w-[20%] flex flex-row lg:flex-col gap-10 flex-wrap lg:flex-nowrap order-3 lg:order-3'>
						{categories
							.slice(0, Math.floor(total_categories / 2))
							.map((category) => (
								<NewsFeedByCategory key={category.id} category={category} />
							))}
					</div>
				</div>
			</div>
		</>
	);
};

export default HomePage;

import { useEffect } from 'react';
import HeroSection from '../components/feeds/HeroSection';
import NewsFeed from '../components/feeds/NewsFeed';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectArticles,
	selectArticlesError,
	selectArticlesLoading,
} from '../features/articles/articleSelector';
import NewsFeedByCategory from '../components/feeds/NewsFeedByCategory';
import { selectCategories } from '../features/categories/categorySelector';
import { fetchArticles } from '../features/articles/articleThunks';
import ArticleSkeleton from '../components/articles/ArticleSkeleton';
import SEOHead from '../components/seo/SEOHead';
import FacebookFeed from '../components/social/FacebookFeed';
import InstagramFeed from '../components/social/InstagramFeed';
import YoutubeFeed from '../components/social/YoutubeFeed';

const HomePage = () => {
	const dispatch = useDispatch();
	const articles = useSelector(selectArticles);
	const categories = useSelector(selectCategories);
	const articlesError = useSelector(selectArticlesError);
	const articlesLoading = useSelector(selectArticlesLoading);

	// Fetch only first page of articles (20 articles)
	useEffect(() => {
		if (articles.length === 0) {
			dispatch(fetchArticles({ page: 1, pageSize: 30 }));
		}
	}, [dispatch, articles.length]);

	// Error state
	if (articlesError) {
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
					<div className='w-full lg:w-[60%]'>
						{articlesLoading && articles.length === 0 ? (
							<>
								<h2 className='text-2xl font-semibold tracking-wider text-dark border-l-4 border-primary py-1 px-3 mb-5 uppercase'>
									Latest Stories
								</h2>
								<div className='grid grid-cols-1 gap-6 mb-10'>
									{[...Array(10)].map((_, i) => (
										<ArticleSkeleton key={i} variant='list' />
									))}
								</div>
								<p className='h-[2px] bg-gray-200 w-full my-10'></p>
								<h2 className='text-2xl font-semibold tracking-wider text-dark border-l-4 border-primary py-1 px-3 mb-5 uppercase'>
									Most Read
								</h2>
								<div className='grid grid-cols-1 gap-6'>
									{[...Array(10)].map((_, i) => (
										<ArticleSkeleton key={i} variant='list' />
									))}
								</div>
							</>
						) : (
							<>
								<NewsFeed
									heading='Latest Stories'
									newsArray={articles.slice(1, 15)}
								/>
								<p className='h-[2px] bg-gray-200 w-full my-10'></p>
								<NewsFeed
									heading='Most Read'
									newsArray={articles.slice(15, 30)}
								/>
							</>
						)}
					</div>
					<div className='w-full lg:w-[40%] flex flex-row lg:flex-col gap-10 flex-wrap lg:flex-nowrap'>
						<div className='pl-0 lg:pl-[20px]'>
							<FacebookFeed />
						</div>
						<div className='pl-0 lg:pl-[20px]'>
							<YoutubeFeed />
						</div>
						<div className='pl-0 lg:pl-[20px]'>
							<InstagramFeed />
						</div>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
							{categories.slice(0, 12).map((category) => (
								<NewsFeedByCategory key={category.id} category={category} />
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default HomePage;

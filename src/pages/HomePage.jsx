import HeroSection from '../components/HeroSection';
import SideNewsFeed from '../components/SideNewsFeed';
import NewsFeed from '../components/NewsFeed';
import { useSelector } from 'react-redux';
import {
	selectArticles,
	selectArticlesError,
} from '../features/articles/articleSelector';
import NewsFeedByCategory from '../components/NewsFeedByCategory';
import { selectCategories } from '../features/categories/categorySelector';

const HomePage = () => {
	const articles = useSelector(selectArticles);
	const categories = useSelector(selectCategories);
	const articlesError = useSelector(selectArticlesError);

	if (articlesError || articles.length === 0) {
		return (
			<div className='min-h-screen bg-gray-50 flex items-center justify-center'>
				<div className='text-center max-w-md'>
					<div className='text-6xl mb-4'>📰</div>
					<h2 className='text-2xl font-bold text-gray-800 mb-2'>
						No Articles Found
					</h2>
					<p className='text-gray-600 mb-6'>
						{'The articles does not exist. Kindly revisit after some time.'}
					</p>
				</div>
			</div>
		);
	}

	const total_categories = categories.length;

	return (
		<div className=''>
			<div className='pt-5'>
				<h1 className='text-3xl font-semibold tracking-wider text-dark border-l-4 border-primary py-1.5 px-5 my-3 uppercase'>
					Headlines
				</h1>
				<HeroSection />
			</div>
			<p className='h-[2px] bg-gray-200 w-full my-10'></p>
			<div className='flex flex-col lg:flex-row gap-5 pt-5 pb-16'>
				<div className='w-full lg:w-[20%] flex flex-row lg:flex-col gap-10'>
					{categories.slice(total_categories / 2).map((category) => (
						<NewsFeedByCategory key={category.id} category={category} />
					))}
				</div>
				<p className='block lg:hidden h-[2px] bg-gray-200 w-full my-10'></p>
				<div className='w-full lg:w-[60%]'>
					<NewsFeed
						heading='Latest Stories'
						newsArray={[...articles].slice(1, 7)}
					/>
					<p className='h-[2px] bg-gray-200 w-full my-10'></p>
					<NewsFeed
						heading='Most Read'
						newsArray={[...articles].reverse().slice(1, 6)}
					/>
				</div>
				<p className='block lg:hidden h-[2px] bg-gray-200 w-full my-10'></p>
				<div className='w-full lg:w-[20%] flex flex-row lg:flex-col gap-10'>
					{categories.slice(0, total_categories / 2).map((category) => (
						<NewsFeedByCategory key={category.id} category={category} />
					))}
				</div>
			</div>
		</div>
	);
};

export default HomePage;

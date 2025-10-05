import HeroSection from '../components/HeroSection';
import SideNewsFeed from '../components/SideNewsFeed';
import NewsFeed from '../components/NewsFeed';
import { useSelector } from 'react-redux';
import {
	selectArticles,
	selectArticlesError,
} from '../features/articles/articleSelector';
import { Loader } from 'lucide-react';

const HomePage = () => {
	const articles = useSelector(selectArticles);
	// const articlesLoading = useSelector(selectArticlesLoading);
	const articlesError = useSelector(selectArticlesError);

	// // Loading State
	// if (articlesLoading) {
	// 	return (
	// 		<div className='min-h-screen bg-gray-50 flex items-center justify-center'>
	// 			<div className='text-center'>
	// 				<Loader
	// 					className='animate-spin text-red-600 mx-auto mb-4'
	// 					size={48}
	// 				/>
	// 				<p className='text-gray-600 font-semibold'>Loading article...</p>
	// 			</div>
	// 		</div>
	// 	);
	// }

	// // Error State
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
					<SideNewsFeed category='Technology' categoryId={2} />
					<div className='mt-0 lg:mt-36'>
						<SideNewsFeed category='Security' categoryId={3} />
					</div>
				</div>
				<p className='block lg:hidden h-[2px] bg-gray-200 w-full my-10'></p>
				<div className='w-full lg:w-[60%]'>
					<NewsFeed
						heading='Latest Stories'
						newsArray={[...articles].slice(0, 6)}
					/>
					<p className='h-[2px] bg-gray-200 w-full my-10'></p>
					<NewsFeed
						heading='Most Read'
						newsArray={[...articles].reverse().slice(1, 6)}
					/>
				</div>
				<p className='block lg:hidden h-[2px] bg-gray-200 w-full my-10'></p>
				<div className='w-full lg:w-[20%] flex flex-row lg:flex-col gap-10'>
					<SideNewsFeed category='Business' categoryId={7} />
					<div className='mt-0 lg:mt-36'>
						<SideNewsFeed category='Science' categoryId={5} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;

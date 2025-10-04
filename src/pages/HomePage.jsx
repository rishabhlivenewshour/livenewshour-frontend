import HeroSection from '../components/HeroSection';
import SideNewsFeed from '../components/SideNewsFeed';
import NewsFeed from '../components/NewsFeed';
import { useSelector } from 'react-redux';
import { selectArticles } from '../features/articles/articleSelector';

const HomePage = () => {
	const articles = useSelector(selectArticles);

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

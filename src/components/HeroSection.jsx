import { selectArticles } from '../features/articles/articleSelector';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticleById } from '../features/articles/articleThunks';
import { useEffect, useState } from 'react';
import BreakingNews from './BreakingNews';
import HeroArticleCard from './HeroArticleCard';

const HeroSection = () => {
	const dispatch = useDispatch();
	const articles = useSelector(selectArticles);
	const [breakingNews, setBreakingNews] = useState(null);

	const fetchBreakingNews = async () => {
		const response = await dispatch(fetchArticleById(articles[0]?.id)).unwrap();
		setBreakingNews(response);
	};

	useEffect(() => {
		articles[0] && fetchBreakingNews();
	}, [articles]);

	return (
		<div className='py-5 flex flex-col lg:flex-row gap-10 lg:gap-5'>
			<div className='w-full lg:w-[65%] h-fit min-h-[350px] '>
				<BreakingNews breakingNews={breakingNews} />
			</div>
			<div className='w-full lg:w-[35%] flex flex-col gap-8 lg:gap-5 text-sm tracking-wide'>
				{/* <h1 className='text-base font-semibold tracking-wider text-dark border-l-4 border-primary py-[2px] px-2 mb-2 uppercase'>
					Trending Now
				</h1> */}
				{articles.slice(1, 4).map((article) => (
					<HeroArticleCard article={article} key={article.id} />
				))}
			</div>
		</div>
	);
};

export default HeroSection;

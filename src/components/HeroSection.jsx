import { selectArticles } from '../features/articles/articleSelector';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticleById } from '../features/articles/articleThunks';
import { useEffect, useState } from 'react';
import BreakingNews from './BreakingNews';
import HeroArticleCard from './HeroArticleCard';
import ArticleSkeleton from './ArticleSkeleton';

const HeroSection = () => {
	const dispatch = useDispatch();
	const articles = useSelector(selectArticles);
	const [breakingNews, setBreakingNews] = useState(null);
	const [isLoadingBreaking, setIsLoadingBreaking] = useState(true);

	useEffect(() => {
		const fetchBreakingNews = async () => {
			try {
				if (articles.length > 0) {
					setIsLoadingBreaking(true);
					const response = await dispatch(
						fetchArticleById(articles[0].id)
					).unwrap();
					setBreakingNews(response);
				}
			} catch (error) {
				console.error('Failed to fetch breaking news:', error);
			} finally {
				setIsLoadingBreaking(false);
			}
		};

		if (articles.length > 0) {
			fetchBreakingNews();
		}
	}, [articles, dispatch]);

	return (
		<div className='py-5 flex flex-col lg:flex-row gap-10 lg:gap-5'>
			<div className='w-full lg:w-[65%] h-fit min-h-[350px]'>
				{isLoadingBreaking ? (
					<ArticleSkeleton variant='hero' />
				) : (
					<BreakingNews breakingNews={breakingNews} />
				)}
			</div>
			<div className='w-full lg:w-[35%] flex flex-col gap-8 lg:gap-5 text-sm tracking-wide'>
				{articles.length > 0 ? (
					articles.slice(1, 4).map((article) => (
						<HeroArticleCard article={article} key={article.id} />
					))
				) : (
					// Show skeletons for sidebar articles
					<>
						<ArticleSkeleton variant='list' />
						<ArticleSkeleton variant='list' />
						<ArticleSkeleton variant='list' />
					</>
				)}
			</div>
		</div>
	);
};

export default HeroSection;
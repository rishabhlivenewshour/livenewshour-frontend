import { useEffect, useState, useRef } from 'react';
import { fetchArticlesByCategory } from '../features/articles/articleThunks';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

const NewsFeedByCategory = ({ category }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [categoryArticles, setCategoryArticles] = useState([]);
	const [isVisible, setIsVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const elementRef = useRef(null);
	const [hasFetched, setHasFetched] = useState(false);

	// Intersection Observer for lazy loading
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !isVisible) {
					setIsVisible(true);
				}
			},
			{
				threshold: 0.1,
				rootMargin: '50px', // Start loading 50px before visible
			}
		);

		if (elementRef.current) {
			observer.observe(elementRef.current);
		}

		return () => {
			if (elementRef.current) {
				observer.unobserve(elementRef.current);
			}
		};
	}, [isVisible]);

	// Fetch articles only when visible
	useEffect(() => {
		const fetchArticles = async () => {
			if (
				isVisible &&
				category?.id &&
				!hasFetched &&
				categoryArticles.length === 0 &&
				!isLoading
			) {
				setIsLoading(true);
				try {
					const result = await dispatch(
						fetchArticlesByCategory({
							categoryId: category.id,
							page: 1,
							pageSize: 4,
						})
					).unwrap();
					const articles = Array.isArray(result.articles)
						? result.articles.slice(0, 4)
						: [];
					setCategoryArticles(articles);
				} catch (error) {
					console.error('Failed to fetch category articles:', error);
				} finally {
					setHasFetched(true);
					setIsLoading(false);
				}
			}
		};

		fetchArticles();
	}, [
		isVisible,
		category?.id,
		hasFetched,
		dispatch,
		categoryArticles.length,
		isLoading,
	]);

	if (!category) return null;

	if (hasFetched && categoryArticles.length === 0) return null;

	return (
		<div ref={elementRef} className='w-[100%]'>
			<div className='flex justify-between items-start'>
				<h1 className='text-sm font-semibold px-2 tracking-wider text-dark border-l-4 border-primary py-[1px] mb-5 uppercase'>
					{category.name}
				</h1>
				{categoryArticles.length >= 4 && (
					<button
						className='flex gap-0.5 py-[3px] hover:text-primary transition'
						onClick={() => navigate(`/news/${category.slug}`)}
						aria-label={`View all ${category.name} articles`}
					>
						<span className='text-xs'>View all</span>
						<ChevronRight size={15} />
					</button>
				)}
			</div>

			{/* Loading skeleton */}
			{isLoading && categoryArticles.length === 0 && (
				<div className='flex flex-col gap-3 animate-pulse'>
					<div className='h-40 bg-gray-300 rounded'></div>
					<div className='h-4 bg-gray-300 rounded w-3/4'></div>
					<div className='h-4 bg-gray-300 rounded w-1/2'></div>
				</div>
			)}

			{/* Articles list */}
			{categoryArticles.length > 0 && (
				<div className='flex flex-col gap-3'>
					<Link
						to={`/news/articles/${categoryArticles[0].slug}`}
						key={categoryArticles[0].id}
						className='flex flex-col gap-2 rounded transition-all duration-150 ease-in-out group'
					>
						<OptimizedImage
							src={categoryArticles[0].banner_image}
							alt={categoryArticles[0].title}
							className='w-full h-[200px] sm:h-auto sm:max-w-[250px] lg:max-w-[300px] rounded'
							onError={(e) => {
								e.target.style.display = 'none';
							}}
						/>
						<h2 className='text-sm font-[500] w-full sm:max-w-[300px] mt-3 group-hover:text-primary transition'>
							{categoryArticles[0].title}
						</h2>
					</Link>

					{categoryArticles.slice(1, 4).map((article) => (
						<Link
							to={`/news/articles/${article.slug}`}
							key={article.id}
							className='flex flex-col gap-2 py-1.5 rounded hover:text-primary border-t border-gray-300 transition-all duration-150 ease-in-out'
						>
							<h2 className='text-sm font-[500] w-full sm:max-w-[300px] mt-3'>
								{article.title}
							</h2>
						</Link>
					))}
				</div>
			)}

			{/* Empty state */}
			{!isLoading && categoryArticles.length === 0 && isVisible && (
				<p className='text-sm text-gray-500 italic'>No articles available</p>
			)}
		</div>
	);
};

export default NewsFeedByCategory;

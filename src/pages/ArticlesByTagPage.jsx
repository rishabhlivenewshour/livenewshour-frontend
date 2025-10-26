import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectArticlesError,
	selectArticlesLoading,
} from '../features/articles/articleSelector';
import BreakingNews from '../components/BreakingNews';
import { Loader } from 'lucide-react';
import { fetchArticlesByTag } from '../features/articles/articleThunks';
import NewsFeed from '../components/NewsFeed';
import ArticleSkeleton from '../components/ArticleSkeleton';
import { getOptimalPageSize } from '../utils/networkDetection';
import SEOHead from '../components/SEOHead';

const ArticlesByTagPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { tag } = useParams();
	const observerTarget = useRef(null);

	const [currentPage, setCurrentPage] = useState(1);
	const [allArticles, setAllArticles] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const [hasFetched, setHasFetched] = useState(false);

	const isLoading = useSelector(selectArticlesLoading);
	const articlesError = useSelector(selectArticlesError);

	// Fetch articles
	const loadArticles = useCallback(async () => {
		if (isLoading) return;

		try {
			if (!hasFetched) {
				const pageSize = getOptimalPageSize();
				const result = await dispatch(
					fetchArticlesByTag({
						tag,
						page: currentPage,
						pageSize,
					})
				).unwrap();

				// Append new articles to existing ones
				setAllArticles((prev) => {
					const newArticles = result.articles || [];
					// Avoid duplicates
					const existingIds = new Set(prev.map((a) => a.id));
					const uniqueNew = newArticles.filter((a) => !existingIds.has(a.id));
					return [...prev, ...uniqueNew];
				});

				// Check if there are more articles
				if (currentPage >= result.pagination.totalPages) {
					setHasMore(false);
				}
			}
		} catch (error) {
			console.error('Failed to fetch articles:', error);
			setHasMore(false);
		} finally {
			setHasFetched(true);
		}
	}, [tag, currentPage, hasFetched, dispatch, isLoading]);

	// Load articles when page changes
	useEffect(() => {
		if (tag) {
			loadArticles();
		}
	}, [tag, loadArticles]);

	// Reset when category changes
	useEffect(() => {
		setCurrentPage(1);
		setAllArticles([]);
		setHasFetched(false);
		setHasMore(true);
	}, [tag]);

	// Intersection Observer for infinite scroll
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasMore && !isLoading) {
					setCurrentPage((prev) => prev + 1);
				}
			},
			{ threshold: 0.1 }
		);

		if (observerTarget.current) {
			observer.observe(observerTarget.current);
		}

		return () => {
			if (observerTarget.current) {
				observer.unobserve(observerTarget.current);
			}
		};
	}, [hasMore, isLoading]);

	// Error State
	if (articlesError || allArticles.length === 0) {
		return (
			<div className='min-h-screen bg-gray-50 flex items-center justify-center'>
				<div className='text-center max-w-md'>
					<div className='text-6xl mb-4'>📰</div>
					<h2 className='text-2xl font-bold text-gray-800 mb-2'>
						No Articles Found
					</h2>
					<p className='text-gray-600 mb-6'>
						The articles for this topic do not exist.
					</p>
					<button
						onClick={() => navigate(-1)}
						className='px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold'
					>
						Go Back
					</button>
				</div>
			</div>
		);
	}

	// Initial Loading State
	if (isLoading && allArticles.length === 0) {
		return (
			<div className='pt-5 w-full flex justify-center'>
				<div className='w-full lg:w-[60%] flex flex-col items-center'>
					<div className='py-5 w-full'>
						<div className='h-8 bg-gray-300 animate-pulse rounded w-48 mb-5'></div>
						<ArticleSkeleton variant='hero' />
					</div>
					<p className='h-[2px] bg-gray-200 w-full my-10'></p>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-10 w-full'>
						<ArticleSkeleton variant='card' />
						<ArticleSkeleton variant='card' />
						<ArticleSkeleton variant='card' />
						<ArticleSkeleton variant='card' />
					</div>
				</div>
			</div>
		);
	}

	return (
		<>
			<SEOHead
				title={`${tag} News - Latest Updates & Headlines`}
				description={`Get all the latest ${tag} news, top stories, and live updates from around the world on Live News Hour.`}
				keywords={[
					`${tag} News`,
					`${tag} Headlines`,
					`Latest ${tag} Updates`,
					'Live News Hour',
				]}
				url={`/news/${tag}`}
				type='website'
				image='https://livenewshour.com/og-image.jpg'
				author='Live News Hour Team'
				tags={[tag]}
			/>
			<div className='pt-5 w-full flex justify-center'>
				<div className='w-full lg:w-[60%] flex flex-col items-center'>
					<div className='py-5 w-full'>
						<h1 className='text-2xl font-semibold tracking-wider text-dark border-l-4 border-primary py-1 px-3 my-5 uppercase'>
							{tag}
						</h1>
						{allArticles[0] && (
							<div className='w-full h-fit'>
								<BreakingNews breakingNews={allArticles[0]} />
							</div>
						)}
					</div>

					{allArticles.length > 1 && (
						<>
							<p className='h-[2px] bg-gray-200 w-full my-10'></p>
							<NewsFeed
								heading={`Latest ${tag} Stories`}
								newsArray={allArticles.slice(1)}
							/>
						</>
					)}

					{/* Infinite Scroll Trigger */}
					{hasMore && (
						<div
							ref={observerTarget}
							className='flex justify-center items-center py-10 w-full'
						>
							{isLoading ? (
								<div className='flex flex-col items-center gap-3'>
									<Loader className='animate-spin text-red-600' size={40} />
									<p className='text-gray-600 text-sm'>
										Loading more articles...
									</p>
								</div>
							) : (
								<div className='h-20'></div>
							)}
						</div>
					)}

					{/* End of List Message */}
					{/* {!hasMore && allArticles.length > 0 && (
						<div className='py-10 text-center w-full'>
							<p className='text-gray-500 text-sm'>
								You've reached the end of {tag} articles
							</p>
						</div>
					)} */}
				</div>
			</div>{' '}
		</>
	);
};

export default ArticlesByTagPage;

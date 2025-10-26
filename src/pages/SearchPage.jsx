import { useEffect, useState, useRef } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { Link, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectArticlesError,
	selectArticlesLoading,
} from '../features/articles/articleSelector';
import { selectCategories } from '../features/categories/categorySelector';
import NewsFeedByCategory from '../components/NewsFeedByCategory';
import {
	fetchArticlesBySearch,
	fetchArticles,
} from '../features/articles/articleThunks';
import { clearSearchResults } from '../features/articles/articleSlice';
import { Loader, Search } from 'lucide-react';
import ArticleSkeleton from '../components/ArticleSkeleton';
import { getOptimalPageSize } from '../utils/networkDetection';
import OptimizedImage from '../components/OptimizedImage';
import SEOHead from '../components/SEOHead';

const SearchPage = () => {
	const dispatch = useDispatch();
	const [searchParams, setSearchParams] = useSearchParams();
	const observerTarget = useRef(null);

	const articlesError = useSelector(selectArticlesError);
	const articlesLoading = useSelector(selectArticlesLoading);
	const categories = useSelector(selectCategories);

	const queryParam = searchParams.get('q') || '';

	const [searchQuery, setSearchQuery] = useState(queryParam);
	const [currentPage, setCurrentPage] = useState(1);
	const [allResults, setAllResults] = useState([]);
	const [hasMore, setHasMore] = useState(false);
	const [recentArticles, setRecentArticles] = useState([]);

	const debouncedSearchQuery = useDebounce(searchQuery, 500);

	const handleChange = (e) => {
		const value = e.target.value;
		setSearchQuery(value);
		setCurrentPage(1);
		setAllResults([]);
		setSearchParams({ q: value });
	};

	// Fetch search results
	useEffect(() => {
		const performSearch = async () => {
			if (debouncedSearchQuery) {
				try {
					const pageSize = getOptimalPageSize();
					const result = await dispatch(
						fetchArticlesBySearch({
							searchQuery: debouncedSearchQuery,
							page: currentPage,
							pageSize,
						})
					).unwrap();

					if (currentPage === 1) {
						setAllResults(result.articles);
					} else {
						setAllResults((prev) => {
							const existingIds = new Set(prev.map((a) => a.id));
							const uniqueNew = result.articles.filter(
								(a) => !existingIds.has(a.id)
							);
							return [...prev, ...uniqueNew];
						});
					}

					setHasMore(currentPage < result.pagination.totalPages);
				} catch (error) {
					console.error('Search error:', error);
					setHasMore(false);
				}
			} else {
				dispatch(clearSearchResults());
				setAllResults([]);
				setHasMore(false);
			}
		};

		performSearch();
	}, [debouncedSearchQuery, currentPage, dispatch]);

	// Fetch recent articles for empty state
	useEffect(() => {
		const fetchRecentArticles = async () => {
			if (!debouncedSearchQuery) {
				try {
					const result = await dispatch(
						fetchArticles({ page: 1, pageSize: 5 })
					).unwrap();
					setRecentArticles(result.articles);
				} catch (error) {
					console.error('Failed to fetch recent articles:', error);
				}
			}
		};
		fetchRecentArticles();
	}, [debouncedSearchQuery, dispatch]);

	// Intersection Observer for infinite scroll
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasMore && !articlesLoading) {
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
	}, [hasMore, articlesLoading]);

	const total_categories = categories.length;

	if (articlesError) {
		return (
			<div className='min-h-screen bg-gray-50 flex items-center justify-center'>
				<div className='text-center max-w-md'>
					<div className='text-6xl mb-4'>📰</div>
					<h2 className='text-2xl font-bold text-gray-800 mb-2'>
						Something went wrong
					</h2>
					<p className='text-gray-600 mb-6'>{articlesError}</p>
					<button
						onClick={() => window.history.back()}
						className='px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold'
					>
						Go Back
					</button>
				</div>
			</div>
		);
	}

	return (
		<>
			<SEOHead
				title={searchQuery ? `Search results for "${searchQuery}"` : 'Search'}
				description={`Explore news articles related to "${searchQuery}" from trusted sources at Live News Hour.`}
				keywords={[searchQuery, 'Live News Hour', 'News Search']}
				url={`/search?q=${encodeURIComponent(searchQuery)}`}
				type='website'
				noIndex={true}
			/>
			<div className='py-5'>
				<div className='flex flex-col lg:flex-row gap-10 pt-5 pb-16 tracking-wide'>
					{/* <p className='block lg:hidden h-[2px] bg-gray-200 w-full my-10'></p> */}
					<div className='w-full lg:w-[25%] flex flex-row lg:flex-col flex-wrap lg:flex-nowrap gap-10 order-2 lg:order-1'>
						{categories
							.slice(Math.floor(total_categories / 2))
							.map((category) => (
								<NewsFeedByCategory key={category.id} category={category} />
							))}
					</div>
					<div className='w-full lg:w-[50%] flex flex-col order-1 lg:order-2'>
						<div className='flex flex-col gap-2 w-full'>
							<p>Search news, topics and more</p>
							<div className='flex'>
								<input
									type='text'
									placeholder='search here'
									value={searchQuery}
									onChange={handleChange}
									required
									className='w-full border border-r-0 border-dark px-3 py-2 text-base rounded rounded-r-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary'
								/>
								<p className='px-5 py-2 bg-dark rounded-r flex items-center justify-center'>
									<Search size={18} className='text-back' />
								</p>
							</div>
						</div>

						{/* Search Results */}
						<div className='flex flex-col gap-5 my-10'>
							{allResults.length > 0 ? (
								<>
									{allResults.map((article) => (
										<Link
											to={`/news/articles/${article.slug}`}
											key={article.id}
											className='flex gap-3 w-full hover:bg-gray-100 p-2 rounded transition'
										>
											<OptimizedImage
												src={article.banner_image}
												alt={article.title}
												className='w-full max-w-[150px] lg:max-w-[250px] h-[100px] object-cover rounded'
												onError={(e) => {
													e.target.style.display = 'none';
												}}
											/>
											<div className='flex-1'>
												<h2 className='font-semibold'>{article.title}</h2>
												<p className='w-full text-sm text-light h-15 overflow-hidden line-clamp-3'>
													{article.summary}
												</p>
												<div className='flex justify-between text-xs mt-1'>
													<p className='font-semibold text-primary'>
														{article.category_name}
													</p>
													<p className='lg:hidden xl:block text-light italic'>
														{'- '}
														{article.author}
													</p>
												</div>
											</div>
										</Link>
									))}

									{/* Infinite Scroll Trigger */}
									{hasMore && (
										<div
											ref={observerTarget}
											className='flex justify-center items-center py-6'
										>
											{articlesLoading ? (
												<div className='flex flex-col items-center gap-3'>
													<Loader
														className='animate-spin text-red-600'
														size={40}
													/>
													<p className='text-gray-600 text-sm'>
														Loading more results...
													</p>
												</div>
											) : (
												<div className='h-10'></div>
											)}
										</div>
									)}

									{/* End of Results */}
									{!hasMore && allResults.length > 0 && (
										<div className='py-6 text-center'>
											<p className='text-gray-500 text-sm'>
												You've reached the end of search results
											</p>
										</div>
									)}
								</>
							) : (
								<div className='w-full'>
									{articlesLoading && currentPage === 1 ? (
										<div className='flex flex-col gap-5'>
											<ArticleSkeleton variant='list' />
											<ArticleSkeleton variant='list' />
											<ArticleSkeleton variant='list' />
										</div>
									) : (
										<>
											<p className='text-light text-center mb-10'>
												{debouncedSearchQuery
													? 'No results found'
													: 'Start typing to search articles'}
											</p>
											{recentArticles.length > 0 && (
												<div className='w-full flex flex-col'>
													<h1 className='text-sm font-semibold tracking-wider text-dark border-l-4 border-primary py-[1px] px-2 mb-5 uppercase'>
														Read Latest news
													</h1>
													<div className='flex flex-col gap-5'>
														{recentArticles.map((article) => (
															<Link
																to={`/news/articles/${article.slug}`}
																key={article.id}
																className='flex gap-3 hover:bg-gray-100 p-2 rounded transition'
															>
																<OptimizedImage
																	src={article.banner_image}
																	alt={article.title}
																	className='w-full max-w-[150px] lg:max-w-[250px] h-[100px] object-cover rounded'
																	onError={(e) => {
																		e.target.style.display = 'none';
																	}}
																/>
																<div className='flex-1'>
																	<h2 className='font-semibold'>
																		{article.title}
																	</h2>
																	<p className='w-full text-sm text-light h-15 overflow-hidden line-clamp-3'>
																		{article.summary}
																	</p>
																	<p className='font-semibold text-xs text-primary'>
																		{article.category_name}
																	</p>
																</div>
															</Link>
														))}
													</div>
												</div>
											)}
										</>
									)}
								</div>
							)}
						</div>
					</div>
					{/* <p className='block lg:hidden h-[2px] bg-gray-200 w-full my-10'></p> */}
					<div className='w-full lg:w-[25%] flex flex-row lg:flex-col flex-wrap lg:flex-nowrap gap-10 order-3 lg:order-3'>
						{categories
							.slice(0, Math.floor(total_categories / 2))
							.map((category) => (
								<NewsFeedByCategory key={category.id} category={category} />
							))}
					</div>
				</div>
			</div>{' '}
		</>
	);
};

export default SearchPage;

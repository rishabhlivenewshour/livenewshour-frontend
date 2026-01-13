import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchArticles } from '../../features/articles/articleThunks';
import { useDispatch } from 'react-redux';
import OptimizedImage from '../common/OptimizedImage';
import { LoaderIcon } from '../common/Icons';
import ArticleSkeleton from '../articles/ArticleSkeleton';

const SearchResults = ({
	debouncedSearchQuery,
	allResults,
	hasMore,
	observerTarget,
	currentPage,
	articlesLoading,
}) => {
	const dispatch = useDispatch();
	const [recentArticles, setRecentArticles] = useState([]);

	useEffect(() => {
		const fetchRecentArticles = async () => {
			if (!debouncedSearchQuery) {
				try {
					const result = await dispatch(
						fetchArticles({ page: 1, pageSize: 20 })
					).unwrap();
					setRecentArticles(result.articles);
				} catch (error) {
					console.error('Failed to fetch recent articles:', error);
				}
			}
		};
		fetchRecentArticles();
	}, [debouncedSearchQuery, dispatch]);

	return (
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
									<LoaderIcon className='animate-spin text-red-600' size={40} />
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
													<h2 className='font-semibold'>{article.title}</h2>
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
	);
};

export default SearchResults;

import { useEffect, useState, useRef } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectArticlesError,
	selectArticlesLoading,
} from '../features/articles/articleSelector';
import { selectCategories } from '../features/categories/categorySelector';
import NewsFeedByCategory from '../components/feeds/NewsFeedByCategory';
import { fetchArticlesBySearch } from '../features/articles/articleThunks';
import { clearSearchResults } from '../features/articles/articleSlice';
import { getOptimalPageSize } from '../utils/networkDetection';
import SEOHead from '../components/seo/SEOHead';
import { SearchIcon } from '../components/common/Icons';
import SearchResults from '../components/feeds/SearchResults';

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
	const [totalPages, setTotalPages] = useState(1);
	const [allResults, setAllResults] = useState([]);
	const [hasMore, setHasMore] = useState(false);

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

					setTotalPages(result.pagination.totalPages);

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

	// Intersection Observer for infinite scroll
	useEffect(() => {
		if (!observerTarget.current) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (
					entries[0].isIntersecting &&
					!articlesLoading &&
					currentPage < totalPages
				) {
					setCurrentPage((prev) => prev + 1);
				}
			},
			{ threshold: 0.1 }
		);

		observer.observe(observerTarget.current);

		return () => observer.disconnect();
	}, [articlesLoading, currentPage, totalPages]);

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
						className='px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition font-semibold'
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
									<SearchIcon size={18} className='text-back' />
								</p>
							</div>
						</div>

						{/* Search Results */}
						<SearchResults
							debouncedSearchQuery={debouncedSearchQuery}
							allResults={allResults}
							hasMore={hasMore}
							observerTarget={observerTarget}
							currentPage={currentPage}
							articlesLoading={articlesLoading}
						/>
					</div>

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

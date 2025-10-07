import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useDebounce } from '../hooks/useDebounce';
import { Link, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectArticles,
	selectArticlesError,
	// selectArticlesLoading,
} from '../features/articles/articleSelector';
import { getCategoryNameById } from '../service/commonFunctions';
import { selectCategories } from '../features/categories/categorySelector';
import NewsFeedByCategory from '../components/NewsFeedByCategory';
import { fetchArticlesBySearch } from '../features/articles/articleThunks';

const SearchPage = () => {
	const dispatch = useDispatch();
	const [searchParams, setSearchParams] = useSearchParams();

	const articles = useSelector(selectArticles);
	const articlesError = useSelector(selectArticlesError);

	const categories = useSelector(selectCategories);
	const queryParam = searchParams.get('q') || '';
	const [searchQuery, setSearchQuery] = useState(queryParam);
	const debouncedSearchQuery = useDebounce(searchQuery, 500);
	const [filteredNews, setFilteredNews] = useState(articles.slice(0, 3));

	const handleChange = (e) => {
		const value = e.target.value;
		setSearchQuery(value);
		setSearchParams({ q: value });
	};

	const fetchArticles = async () => {
		const searchTerm = debouncedSearchQuery?.toLowerCase();
		if (searchTerm) {
			const data = await dispatch(fetchArticlesBySearch(searchTerm)).unwrap();
			setFilteredNews(data);
		}
	};
	useEffect(() => {
		debouncedSearchQuery && fetchArticles();
	}, [debouncedSearchQuery, articles]);

	const total_categories = categories.length;

	if (articlesError || articles.length === 0) {
		return (
			<div className='min-h-screen bg-gray-50 flex items-center justify-center'>
				<div className='text-center max-w-md'>
					<div className='text-6xl mb-4'>📰</div>
					<h2 className='text-2xl font-bold text-gray-800 mb-2'>
						No Articles Found
					</h2>
					<p className='text-gray-600 mb-6'>
						{'The articles for this topic does not exist.'}
					</p>
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
		<div className='py-5'>
			<div className='flex flex-col lg:flex-row gap-10 pt-5 pb-16 tracking-wide'>
				<p className='block lg:hidden h-[2px] bg-gray-200 w-full my-10'></p>
				<div className='w-full lg:w-[25%] flex flex-row lg:flex-col gap-10'>
					{categories.slice(total_categories / 2).map((category) => (
						<NewsFeedByCategory key={category.id} category={category} />
					))}
				</div>
				<div className='w-full lg:w-[50%] flex flex-col -order-1 lg:order-none'>
					<div className='flex flex-col gap-2 w-full'>
						<p>Search news,topics and more</p>
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
								<FaSearch size={18} className='text-back' />
							</p>
						</div>
					</div>
					<div className='flex flex-col gap-5 my-10 items-center'>
						{filteredNews.length > 0 ? (
							filteredNews.map((article) => (
								<Link
									to={`/news/articles/${article.slug}`}
									key={article.id}
									className='flex gap-3'
								>
									<img
										src={article.banner_image}
										alt='Featured article'
										className='w-full max-w-[250px] h-[100px] object-cover rounded'
									/>
									<div className=''>
										<h2 className='font-semibold'>{article.title}</h2>
										<p className='w-full text-sm text-light h-15 overflow-hidden line-clamp-3'>
											{article.summary}
										</p>
										<div className='flex justify-between text-xs mt-1'>
											<p className='font-semibold text-primary'>
												{getCategoryNameById(categories, article.category)}
											</p>
											<p className='lg:hidden xl:block text-light italic'>
												{'- '}
												{article.author}
											</p>
										</div>
									</div>
								</Link>
							))
						) : (
							<div>
								<p className='text-light text-center mb-10'>No results found</p>
								<div className='w-full flex flex-col'>
									<h1 className='text-sm font-semibold tracking-wider text-dark border-l-4 border-primary py-[1px] px-2 mb-5 uppercase'>
										Read Latest news
									</h1>
									<div className='flex flex-col gap-5'>
										{articles.slice(0, 5).map((article) => (
											<Link
												to={`/news/articles/${article.slug}`}
												key={article.id}
												className='flex gap-3'
											>
												<img
													src={article.banner_image}
													alt='Featured article'
													className='w-full max-w-[250px] h-[100px] object-cover rounded'
												/>
												<div className=''>
													<h2 className='font-semibold'>{article.title}</h2>
													<p className='w-full text-sm text-light h-15 overflow-hidden line-clamp-3'>
														{article.summary}
													</p>
													<p className='font-semibold text-xs text-primary'>
														{getCategoryNameById(categories, article.category)}
													</p>
												</div>
											</Link>
										))}
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
				<p className='block lg:hidden h-[2px] bg-gray-200 w-full my-10'></p>
				<div className='w-full lg:w-[25%] flex flex-row lg:flex-col gap-10'>
					{categories.slice(0, total_categories / 2).map((category) => (
						<NewsFeedByCategory key={category.id} category={category} />
					))}
				</div>
			</div>
		</div>
	);
};

export default SearchPage;

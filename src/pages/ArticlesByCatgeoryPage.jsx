import { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectArticles,
	selectArticlesError,
} from '../features/articles/articleSelector';
import { selectCategories } from '../features/categories/categorySelector';
import BreakingNews from '../components/BreakingNews';
import { Loader } from 'lucide-react';
import { fetchArticlesByCategory } from '../features/articles/articleThunks';
import NewsFeed from '../components/NewsFeed';

const ArticlesByCategoryPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { category_slug } = useParams();

	const [categoryArticles, setCategoryArticles] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const categories = useSelector(selectCategories);
	const articles = useSelector(selectArticles);
	const articlesError = useSelector(selectArticlesError);

	// Memoize category lookup
	const currentCategory = useMemo(
		() => categories.find((cat) => cat.slug === category_slug),
		[categories, category_slug]
	);

	const categoryId = currentCategory?.id;
	const categoryName = currentCategory?.name || '';

	// Memoize related articles calculation
	const relatedArticles = useMemo(() => {
		const firstArticleId = categoryArticles[0]?.id;
		return articles.filter((a) => a.id !== firstArticleId).slice(0, 6);
	}, [articles, categoryArticles]);

	// Fetch articles by category
	const loadCategoryArticles = useCallback(async () => {
		if (!categoryId) return;

		try {
			setIsLoading(true);
			const data = await dispatch(fetchArticlesByCategory(categoryId)).unwrap();
			setCategoryArticles(data);
		} catch (error) {
			console.error('Failed to fetch category articles:', error);
		} finally {
			setIsLoading(false);
		}
	}, [categoryId, dispatch]);

	// Load category articles when slug changes
	useEffect(() => {
		loadCategoryArticles();
	}, [loadCategoryArticles]);

	// Loading State
	if (isLoading) {
		return (
			<div className='min-h-screen bg-gray-50 flex items-center justify-center'>
				<div className='text-center'>
					<Loader
						className='animate-spin text-red-600 mx-auto mb-4'
						size={48}
					/>
					<p className='text-gray-600 font-semibold'>Loading articles...</p>
				</div>
			</div>
		);
	}

	// Error State
	if (articlesError || categoryArticles.length === 0) {
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

	return (
		<div className='pt-5 w-full flex justify-center'>
			<div className='w-full lg:w-[60%] flex flex-col items-center'>
				<div className='py-5 w-full'>
					<h1 className='text-2xl font-semibold tracking-wider text-dark border-l-4 border-primary py-1 px-3 my-5 uppercase'>
						{categoryName}
					</h1>
					{categoryArticles[0] && (
						<div className='w-full h-fit'>
							<BreakingNews breakingNews={categoryArticles[0]} />
						</div>
					)}
				</div>
				<p className='h-[2px] bg-gray-200 w-full my-10'></p>
				{categoryArticles.length > 1 && (
					<NewsFeed
						heading={`Latest ${categoryName} Stories`}
						newsArray={categoryArticles?.slice(1, 10)}
					/>
				)}
				{relatedArticles.length > 0 && (
					<>
						<p className='h-[2px] bg-gray-200 w-full my-10'></p>
						<div className='mb-10 w-full'>
							<NewsFeed heading='Related Stories' newsArray={relatedArticles} />
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default ArticlesByCategoryPage;

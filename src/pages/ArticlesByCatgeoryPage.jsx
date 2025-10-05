import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectArticles,
	selectArticlesError,
} from '../features/articles/articleSelector';
import { selectCategories } from '../features/categories/categorySelector';
import { getCategoryNameById } from '../service/commonFunctions';
import BreakingNews from '../components/BreakingNews';
import { Loader } from 'lucide-react';
import { fetchArticleById } from '../features/articles/articleThunks';
import NewsFeed from '../components/NewsFeed';

const ArticlesByCatgeoryPage = () => {
	const dispatch = useDispatch();
	const [categoryArticles, setCategoryArticles] = useState([]);
	const [categoryName, setCategoryName] = useState('');
	const [relatedArticles, setRelatedArticles] = useState([]);
	const { category_slug } = useParams();

	const articles = useSelector(selectArticles);
	// const articlesLoading = useSelector(selectArticlesLoading);
	const articlesError = useSelector(selectArticlesError);
	const categories = useSelector(selectCategories);

	let category_id = 1;

	const fetchArticlesByCategory = () => {
		category_id = categories.find((cat) => cat.slug === category_slug)?.id;
		const filteredArticles = articles.filter(
			(article) => article.category === category_id
		);
		setCategoryArticles(filteredArticles);
	};

	useEffect(() => {
		fetchArticlesByCategory();
	}, [category_slug, articles, categories]);

	useEffect(() => {
		const category_name = getCategoryNameById(categories, category_id);
		setCategoryName(category_name);
	}, [category_slug, category_id, categories]);

	const [breakingNews, setBreakingNews] = useState(null);

	const fetchBreakingNews = async () => {
		const response = await dispatch(
			fetchArticleById(categoryArticles[0]?.id)
		).unwrap();
		setBreakingNews(response);
	};

	useEffect(() => {
		categoryArticles[0] && fetchBreakingNews();
		fetchRelatedArticles();
	}, [categoryArticles]);

	const fetchRelatedArticles = () => {
		setRelatedArticles(
			articles.filter((a) => a.id !== categoryArticles[0]?.id)
		);
	};

	// Loading State
	// if (articlesLoading) {
	// 	return (
	// 		<div className='min-h-screen bg-gray-50 flex items-center justify-center'>
	// 			<div className='text-center'>
	// 				<Loader
	// 					className='animate-spin text-red-600 mx-auto mb-4'
	// 					size={48}
	// 				/>
	// 				<p className='text-gray-600 font-semibold'>Loading article...</p>
	// 			</div>
	// 		</div>
	// 	);
	// }

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
		<div className='pt-5 w-full flex justify-center'>
			<div className='w-full lg:w-[60%] flex flex-col items-center'>
				<div className='py-5'>
					<h1 className='text-2xl font-semibold tracking-wider text-dark border-l-4 border-primary py-1 px-3 my-5 uppercase'>
						{categoryName}
					</h1>
					<div className='w-full h-fit'>
						<BreakingNews breakingNews={breakingNews} />
					</div>
				</div>
				<p className='h-[2px] bg-gray-200 w-full my-10'></p>
				<NewsFeed
					heading={`Latest ${categoryName} Stories`}
					newsArray={[...categoryArticles].slice(0, 6)}
				/>
				<p className='h-[2px] bg-gray-200 w-full my-10'></p>
				<div className='mb-10'>
					<NewsFeed
						heading={`Related Stories`}
						newsArray={[...relatedArticles].slice(0, 6)}
					/>
				</div>
			</div>
		</div>
	);
};

export default ArticlesByCatgeoryPage;

import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectArticles,
	selectArticlesError,
} from '../features/articles/articleSelector';
import { selectSubcategories } from '../features/subcategories/subcatgeorySelector';
import { Loader } from 'lucide-react';
import NewsFeed from '../components/NewsFeed';
import { fetchArticleById } from '../features/articles/articleThunks';
import { getSubcategoryNameById } from '../service/commonFunctions';
import BreakingNews from '../components/BreakingNews';

const ArticlesBySubcatgeoryPage = () => {
	const dispatch = useDispatch();
	const [subcategoryArticles, setSubcategoryArticles] = useState([]);
	const [subcategoryName, setSubcategoryName] = useState('');
	const [relatedArticles, setRelatedArticles] = useState([]);
	const { subcategory_slug } = useParams();
	const articles = useSelector(selectArticles);
	// const articlesLoading = useSelector(selectArticlesLoading);
	const articlesError = useSelector(selectArticlesError);
	const subcategories = useSelector(selectSubcategories);

	let subcategory_id = 1;

	const fetchArticlesBySubcategory = () => {
		subcategory_id = subcategories.find(
			(subcat) => subcat?.slug === subcategory_slug
		)?.id;
		const filteredArticles = articles.filter(
			(article) => article.subcategory === subcategory_id
		);
		setSubcategoryArticles(filteredArticles);
	};

	useEffect(() => {
		fetchArticlesBySubcategory();
	}, [subcategory_slug, articles]);

	useEffect(() => {
		const subcategory_name = getSubcategoryNameById(
			subcategories,
			subcategory_id
		);
		setSubcategoryName(subcategory_name);
	}, [subcategory_slug, subcategory_id, subcategories]);

	const [breakingNews, setBreakingNews] = useState(null);

	const fetchBreakingNews = async () => {
		const response = await dispatch(
			fetchArticleById(subcategoryArticles[0]?.id)
		).unwrap();
		setBreakingNews(response);
	};

	useEffect(() => {
		subcategoryArticles[0] && fetchBreakingNews();
		fetchRelatedArticles();
	}, [subcategoryArticles]);

	const fetchRelatedArticles = () => {
		setRelatedArticles(
			articles.filter((a) => a.id !== subcategoryArticles[0]?.id)
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
	if (articlesError || subcategoryArticles.length === 0) {
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
						{subcategoryName}
					</h1>
					<div className='w-full h-fit'>
						<BreakingNews breakingNews={breakingNews} />
					</div>
				</div>
				<p className='h-[2px] bg-gray-200 w-full my-10'></p>
				<NewsFeed
					heading={`Latest ${subcategoryName} Stories`}
					newsArray={[...subcategoryArticles].slice(0, 6)}
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

export default ArticlesBySubcatgeoryPage;

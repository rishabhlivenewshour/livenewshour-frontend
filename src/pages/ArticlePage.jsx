import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { fetchArticleByCategorySlug } from '../features/articles/articleThunks';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectArticlesError,
	selectArticlesLoading,
} from '../features/articles/articleSelector';
import { cacheArticle } from '../features/articles/articleSlice';
import { LoaderIcon } from '../components/common/Icons';
import SEOHead from '../components/seo/SEOHead';
import ArticleInfo from '../components/articles/ArticleInfo';
import ArticleShare from '../components/articles/ArticleShare';
import ArticleData from '../components/articles/ArticleData';
import RelatedArticles from '../components/articles/RelatedArticles';

const ArticlePage = () => {
	const dispatch = useDispatch();
	const { article_slug } = useParams();

	const [article, setArticle] = useState(null);

	const articlesLoading = useSelector(selectArticlesLoading);
	const articlesError = useSelector(selectArticlesError);

	// Fetch article
	useEffect(() => {
		const fetchArticle = async () => {
			try {
				const response = await dispatch(
					fetchArticleByCategorySlug(article_slug)
				).unwrap();
				setArticle(response);
				dispatch(cacheArticle(response));
			} catch (error) {
				console.error('Failed to fetch article:', error);
			}
		};

		fetchArticle();
	}, [article_slug, dispatch]);

	// Loading State
	if (articlesLoading) {
		return (
			<div className='min-h-screen bg-gray-50 flex items-center justify-center'>
				<div className='text-center'>
					<LoaderIcon
						className='animate-spin text-red-600 mx-auto mb-4'
						size={48}
					/>
					<p className='text-gray-600 font-semibold'>Loading article...</p>
				</div>
			</div>
		);
	}

	// Error State
	if (articlesError || !article) {
		return (
			<div className='min-h-screen bg-gray-50 flex items-center justify-center'>
				<div className='text-center max-w-md'>
					<div className='text-6xl mb-4'>📰</div>
					<h2 className='text-2xl font-bold text-gray-800 mb-2'>
						Article Not Found
					</h2>
					<p className='text-gray-600 mb-6'>
						{articlesError || 'The article you are looking for does not exist.'}
					</p>
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
				title={article.title}
				description={article.summary}
				keywords={article.related_keywords || []}
				image={article.banner_image}
				url={`/news/articles/${article.slug}`}
				type='article'
				author={article.author}
				publishedTime={article.published_at || article.created_at}
				modifiedTime={article.updated_at}
				category={article.category_name}
				tags={article.related_keywords || []}
			/>
			<div className='pt-5 min-h-screen'>
				<main className='max-w-7xl mx-auto px-0 sm:px-4 py-8'>
					<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
						<article className='lg:col-span-2'>
							<ArticleInfo article={article} />

							<ArticleShare article={article} />

							<ArticleData article={article} />
						</article>
						<aside className='space-y-8'>
							<RelatedArticles article={article} />
						</aside>
					</div>
				</main>
			</div>
		</>
	);
};

export default ArticlePage;

import { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { fetchArticleByCategorySlug } from '../features/articles/articleThunks';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectArticlesError,
	selectArticlesLoading,
} from '../features/articles/articleSelector';
import { calculateReadTime, formatDate } from '../utils/CommonFunctions';
import { cacheArticle } from '../features/articles/articleSlice';
import OptimizedImage from '../components/OptimizedImage';
import SEOHead from '../components/SEOHead';
import {
	CalendarIcon,
	ClockIcon,
	CopyIcon,
	FacebookIcon,
	InstagramIcon,
	LinkedinIcon,
	LoaderIcon,
	MailIcon,
	ShareIcon,
	TagIcon,
	TickIcon,
	UserIcon,
	WhatsappIcon,
	XTwitterIcon,
} from '../components/Icons';

const getShareUrls = (url, text) => ({
	facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
		url
	)}`,
	x: `https://x.com/intent/tweet?url=${encodeURIComponent(
		url
	)}&text=${encodeURIComponent(text)}`,
	linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
		url
	)}`,
	email: `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(
		url
	)}`,
	whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(
		text + ' ' + url
	)}`,
});

const ArticlePage = () => {
	const dispatch = useDispatch();
	const { article_slug } = useParams();

	const [article, setArticle] = useState(null);
	const [relatedArticles, setRelatedArticles] = useState([]);
	// const [isBookmarked, setIsBookmarked] = useState(false);
	const [copied, setCopied] = useState(false);

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

	// Fetch related articles
	useEffect(() => {
		const fetchRelatedArticles = async () => {
			if (article?.category) {
				try {
					// You'll need to create an endpoint that excludes current article
					// For now, using a simple approach
					const response = await fetch(
						`${import.meta.env.VITE_BACKEND_URL}/news/categories/${
							article.category
						}/articles/?page_size=4`
					);
					const data = await response.json();
					const filtered = data.results
						.filter((a) => a.id !== article.id)
						.slice(0, 3);
					setRelatedArticles(filtered);
				} catch (error) {
					console.error('Failed to fetch related articles:', error);
				}
			}
		};

		if (article) {
			fetchRelatedArticles();
		}
	}, [article]);

	// Check bookmarked status from localStorage
	// useEffect(() => {
	// 	if (article?.id) {
	// 		const bookmarked = localStorage.getItem(`bookmark_${article.id}`);
	// 		setIsBookmarked(bookmarked === 'true');
	// 	}
	// }, [article?.id]);

	const handleCopy = () => {
		navigator.clipboard.writeText(window.location.href);
		setCopied(true);

		setTimeout(() => {
			setCopied(false);
		}, 3000);
	};

	const shareArticle = (platform) => {
		const url = window.location.href;
		const text = article?.title || '';

		const shareUrls = getShareUrls(url, text);

		if (shareUrls[platform]) {
			window.open(shareUrls[platform], '_blank', 'width=600,height=400');
		}
	};

	// const handleBookmark = () => {
	// 	const newBookmarkState = !isBookmarked;
	// 	setIsBookmarked(newBookmarkState);
	// 	localStorage.setItem(`bookmark_${article.id}`, newBookmarkState.toString());
	// };

	const purifiedContent = useMemo(() => {
		if (!article?.content) return '';
		const cleaned = article.content.replace(/\\"/g, '"');
		return DOMPurify.sanitize(cleaned);
	}, [article?.content]);

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
			<div className='min-h-screen bg-gray-50'>
				<main className='max-w-7xl mx-auto px-4 py-8'>
					<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
						<article className='lg:col-span-2'>
							{article.tag && (
								<div className='mb-4'>
									<span className='inline-block px-4 py-1.5 bg-primary text-white text-sm font-bold rounded-md uppercase tracking-wide'>
										{article.tag}
									</span>
								</div>
							)}

							<h1 className='text-4xl md:text-5xl font-bold leading-tight mb-4'>
								{article.title}
							</h1>

							{article.summary && (
								<h2 className='text-xl md:text-2xl text-gray-600 font-normal mb-6'>
									{article.summary}
								</h2>
							)}

							<div className='flex flex-wrap items-center gap-4 py-4 border-y border-gray-300 mb-6'>
								{article.category && (
									<div className='flex px-3 py-2 bg-green-200 text-green-800 text-xs font-semibold rounded'>
										<TagIcon size={16} />
										<span className='font-semibold ml-2'>
											{article.category_name}
										</span>
									</div>
								)}
								<div className='flex px-3 py-2 bg-blue-200 text-gray-800 text-xs font-semibold rounded'>
									<UserIcon size={16} />
									<span className='font-semibold ml-2'>{article.author}</span>
								</div>
								<div className='flex items-center gap-2 text-sm text-gray-600'>
									<CalendarIcon size={16} />
									<span>
										{formatDate(article.published_at || article.created_at)}
									</span>
								</div>
								<div className='flex items-center gap-2 text-sm text-gray-600'>
									<ClockIcon size={16} />
									<span>{calculateReadTime(article.content)} min read</span>
								</div>
							</div>

							<div className='flex items-center justify-end gap-3 mb-8'>
								<div className='flex gap-2'>
									<button
										onClick={() => shareArticle('facebook')}
										className='h-[40px] w-[40px] flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 transition text-sm font-semibold'
									>
										<FacebookIcon size={22} className='' />
									</button>
									<button
										onClick={() => shareArticle('whatsapp')}
										className='h-[40px] w-[40px] flex items-center justify-center bg-green-700 text-white rounded-full hover:bg-green-800 transition text-sm font-semibold'
									>
										<WhatsappIcon size={22} className='' />
									</button>
									<button
										onClick={() => shareArticle('x')}
										className='h-[40px] w-[40px] flex items-center justify-center bg-gray-800 text-white rounded-full hover:bg-gray-900 transition text-sm font-semibold'
									>
										<XTwitterIcon size={22} className='' />
									</button>
									<button
										onClick={() => shareArticle('linkedin')}
										className='h-[40px] w-[40px] flex items-center justify-center bg-blue-700 text-white rounded-full hover:bg-blue-800 transition text-sm font-semibold'
									>
										<LinkedinIcon size={22} className='' />
									</button>
									<button
										onClick={() => shareArticle('email')}
										className='h-[40px] w-[40px] flex items-center justify-center bg-red-600 text-white rounded-full hover:bg-red-700 transition text-sm font-semibold'
									>
										<MailIcon size={22} className='' />
									</button>
									<button
										onClick={handleCopy}
										className='h-[40px] w-[40px] flex items-center justify-center bg-gray-600 text-white rounded-full hover:bg-gray-700 transition text-sm font-semibold'
									>
										{copied ? (
											<TickIcon size={22} className='' />
										) : (
											<CopyIcon size={22} className='' />
										)}
									</button>
								</div>

								{/* <button
									onClick={handleBookmark}
									className={`flex items-center gap-2 px-4 py-2 rounded border transition text-sm font-semibold ${
										isBookmarked
											? 'bg- border-red-600 text-red-600'
											: 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
									}`}
								>
									<BookmarkIcon
										size={18}
										fill={isBookmarked ? 'currentColor' : 'none'}
									/>
									{isBookmarked ? 'Saved' : 'Save'}
								</button> */}
							</div>

							{article.banner_image && (
								<figure className='mb-8'>
									<OptimizedImage
										src={article.banner_image}
										alt={article.title}
										className='w-full h-auto rounded-lg shadow-lg'
										onError={(e) => {
											e.target.style.display = 'none';
										}}
									/>
								</figure>
							)}

							<div className='editor-content prose prose-lg max-w-none mb-12'>
								<div
									className='text-gray-800 leading-relaxed'
									dangerouslySetInnerHTML={{
										__html: purifiedContent,
									}}
								/>
							</div>

							{article.related_keywords &&
								article.related_keywords.length > 0 && (
									<div className='border-t border-gray-300 pt-6 mb-8 flex flex-wrap gap-4'>
										<p className='text-sm tracking-wide'>Related Keywords:</p>
										<div className='text-sm flex flex-wrap gap-2'>
											{article.related_keywords.map((keyword, index) => (
												<span
													key={`${keyword}-${index}`}
													className='px-2 py-1 bg-gray-200 rounded text-gray-800'
												>
													{keyword}
												</span>
											))}
										</div>
									</div>
								)}
						</article>

						<aside className='space-y-8'>
							{relatedArticles.length > 0 && (
								<div className='bg-white border border-gray-300 rounded-lg overflow-hidden'>
									<div className='bg-gray-100 px-4 py-3 border-b border-gray-300'>
										<h3 className='font-bold text-lg'>Related Articles</h3>
									</div>
									<div className='divide-y divide-gray-200'>
										{relatedArticles.map((related) => (
											<Link
												key={related.id}
												to={`/news/articles/${related.slug}`}
												className='block p-4 hover:bg-gray-50 transition'
											>
												<div className='flex gap-3'>
													{related.banner_image && (
														<OptimizedImage
															src={related.banner_image}
															alt={related.title}
															className='w-24 h-24 object-cover rounded'
															onError={(e) => {
																e.target.style.display = 'none';
															}}
														/>
													)}
													<div className='flex-1'>
														<h4 className='font-semibold text-sm leading-tight mb-2'>
															{related.title}
														</h4>
														<p className='text-xs text-gray-500'>
															{formatDate(
																related.published_at || related.created_at
															)}
														</p>
													</div>
												</div>
											</Link>
										))}
									</div>
								</div>
							)}
						</aside>
					</div>
				</main>
			</div>
		</>
	);
};

export default ArticlePage;

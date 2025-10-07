import { useState, useEffect } from 'react';
import {
	Calendar,
	User,
	Share2,
	Facebook,
	Twitter,
	Linkedin,
	Mail,
	Bookmark,
	Clock,
	Loader,
	Tag,
} from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';
import { Link, useParams } from 'react-router-dom';
import { fetchArticleById } from '../features/articles/articleThunks';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectArticles,
	selectArticlesError,
	selectArticlesLoading,
} from '../features/articles/articleSelector';
import { calculateReadTime, formatDate } from '../utils/CommonFunctions';
import { getCategoryNameById } from '../service/commonFunctions';
import { selectCategories } from '../features/categories/categorySelector';

const ArticlePage = () => {
	const dispatch = useDispatch();
	const [article, setArticle] = useState(null);
	const [relatedArticles, setRelatedArticles] = useState([]);
	const [isBookmarked, setIsBookmarked] = useState(false);
	const [showShareMenu, setShowShareMenu] = useState(false);

	const { article_slug } = useParams();
	const articles = useSelector(selectArticles);
	const articlesLoading = useSelector(selectArticlesLoading);
	const articlesError = useSelector(selectArticlesError);

	const categories = useSelector(selectCategories);

	// API Configuration
	let article_id = 1;

	useEffect(() => {
		fetchArticle();
		fetchRelatedArticles();
	}, [article_id, article_slug, articles, dispatch]);

	const fetchArticle = async () => {
		article_id = articles.find((art) => art.slug === article_slug)?.id;
		const found_article = await dispatch(fetchArticleById(article_id)).unwrap();

		setArticle(found_article);
	};

	const fetchRelatedArticles = async () => {
		setRelatedArticles(articles.filter((a) => a.id !== article_id));
	};

	const shareArticle = (platform) => {
		const url = window.location.href;
		const text = article?.title || '';

		const shareUrls = {
			facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
			x: `https://x.com/intent/tweet?url=${url}&text=${text}`,
			linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
			email: `mailto:?subject=${text}&body=${url}`,
		};

		if (shareUrls[platform]) {
			window.open(shareUrls[platform], '_blank', 'width=600,height=400');
		}
		setShowShareMenu(false);
	};

	// Loading State
	if (articlesLoading) {
		return (
			<div className='min-h-screen bg-gray-50 flex items-center justify-center'>
				<div className='text-center'>
					<Loader
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
						className='px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold'
					>
						Go Back
					</button>
				</div>
			</div>
		);
	}

	const formattedContent = (content) => {
		return content
			.replace(/\\"/g, '"') // fix quotes
			.split('\n\n') // split paragraphs
			.map((p) => `<p>${p}</p>`)
			.join('</br>');
	};

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Main Content */}
			<main className='max-w-7xl mx-auto px-4 py-8'>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					{/* Article Content */}
					<article className='lg:col-span-2'>
						{/* Breaking News Badge - Show if recently published */}
						{article.tag && (
							<div className='mb-4'>
								<span className='inline-block px-4 py-1.5 bg-red-600 text-white text-sm font-bold rounded-md uppercase tracking-wide'>
									{article.tag}
								</span>
							</div>
						)}

						{/* Title */}
						<h1 className='text-4xl md:text-5xl font-bold leading-tight mb-4'>
							{article.title}
						</h1>

						{/* Summary as Subtitle */}
						{article.summary && (
							<h2 className='text-xl md:text-2xl text-gray-600 font-normal mb-6'>
								{article.summary}
							</h2>
						)}

						{/* Metadata Bar */}
						<div className='flex flex-wrap items-center gap-4 py-4 border-y border-gray-300 mb-6'>
							{article.category && (
								<div className='flex px-3 py-2 bg-green-200 text-green-800 text-xs font-semibold rounded'>
									<Tag size={16} />
									<span className='font-semibold ml-2'>
										{getCategoryNameById(categories, article.category)}
									</span>
								</div>
							)}
							<div className='flex px-3 py-2 bg-blue-200 text-gray-800 text-xs font-semibold rounded'>
								<User size={16} />
								<span className='font-semibold ml-2'>{article.author}</span>
							</div>
							<div className='flex items-center gap-2 text-sm text-gray-600'>
								<Calendar size={16} />
								<span>
									{formatDate(article.published_at || article.created_at)}
								</span>
							</div>
							<div className='flex items-center gap-2 text-sm text-gray-600'>
								<Clock size={16} />
								<span>{calculateReadTime(article.content)} min read</span>
							</div>
						</div>

						{/* Action Buttons */}
						<div className='flex items-center gap-3 mb-8'>
							<div className='relative'>
								<button
									onClick={() => setShowShareMenu(!showShareMenu)}
									className='flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm font-semibold'
								>
									<Share2 size={18} />
									Share
								</button>

								{/* Share Menu */}
								{showShareMenu && (
									<div className='absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-10 min-w-[160px]'>
										<button
											onClick={() => shareArticle('facebook')}
											className='w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition text-sm'
										>
											<Facebook size={18} className='text-blue-600' />
											Facebook
										</button>
										<button
											onClick={() => shareArticle('x')}
											className='w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition text-sm'
										>
											<FaXTwitter size={18} className='text-sky-500' />x
										</button>
										<button
											onClick={() => shareArticle('linkedin')}
											className='w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition text-sm'
										>
											<Linkedin size={18} className='text-blue-700' />
											LinkedIn
										</button>
										<button
											onClick={() => shareArticle('email')}
											className='w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition text-sm'
										>
											<Mail size={18} className='text-gray-600' />
											Email
										</button>
									</div>
								)}
							</div>

							<button
								onClick={() => setIsBookmarked(!isBookmarked)}
								className={`flex items-center gap-2 px-4 py-2 rounded border transition text-sm font-semibold ${
									isBookmarked
										? 'bg-red-50 border-red-600 text-red-600'
										: 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
								}`}
							>
								<Bookmark
									size={18}
									fill={isBookmarked ? 'currentColor' : 'none'}
								/>
								{isBookmarked ? 'Saved' : 'Save'}
							</button>
						</div>

						{/* Banner Image */}
						{article.banner_image && (
							<figure className='mb-8'>
								<img
									src={article.banner_image}
									alt={article.title}
									className='w-full h-auto rounded-lg shadow-lg'
									onError={(e) => {
										e.target.style.display = 'none';
									}}
								/>
							</figure>
						)}

						{/* Article Summary Highlight */}
						{article.summary && (
							<div className='bg-gray-100 border-l-4 border-red-600 p-6 mb-8 rounded-r'>
								<p className='text-lg font-semibold leading-relaxed'>
									{article.summary}
								</p>
							</div>
						)}

						{/* Article Content */}
						<div className='editor-content prose prose-lg max-w-none mb-12'>
							<div
								className='text-gray-800 leading-relaxed'
								dangerouslySetInnerHTML={{
									__html: formattedContent(article.content),
								}}
							/>
						</div>

						{/* Article Metadata */}
						{article.related_keywords && (
							<div className='border-t border-gray-300 pt-6 mb-8 flex flex-wrap gap-4'>
								<p className='text-sm tracking-wide'>Related Keywords:</p>
								<div className='text-sm'>
									{article.related_keywords.map((keyword) => (
										<span
											key={keyword}
											className='mr-2 px-2 py-1 bg-gray-200 rounded text-gray-800'
										>
											{keyword}
										</span>
									))}
								</div>
							</div>
						)}
					</article>

					{/* Sidebar */}
					<aside className='space-y-8'>
						{/* Related Articles */}
						{relatedArticles.length > 0 && (
							<div className='bg-white border border-gray-300 rounded-lg overflow-hidden'>
								<div className='bg-gray-100 px-4 py-3 border-b border-gray-300'>
									<h3 className='font-bold text-lg'>Related Articles</h3>
								</div>
								<div className='divide-y divide-gray-200'>
									{relatedArticles.slice(0, 3).map((related) => (
										<Link
											key={related.id}
											to={`/news/articles/${related.slug}`}
											className='block p-4 hover:bg-gray-50 transition'
										>
											<div className='flex gap-3'>
												{related.banner_image && (
													<img
														src={related.banner_image}
														alt={related.title}
														className='w-24 h-24 object-cover rounded'
														onError={(e) => {
															e.target.style.display = 'none';
														}}
													/>
												)}
												<div className='flex-1'>
													{related.is_published && (
														<span className='inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold uppercase rounded mb-2'>
															Published
														</span>
													)}
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
	);
};

export default ArticlePage;

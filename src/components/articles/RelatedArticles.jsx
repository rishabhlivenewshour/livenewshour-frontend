import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/CommonFunctions';
import OptimizedImage from '../common/OptimizedImage';

const RelatedArticles = ({ article }) => {
	const [relatedArticles, setRelatedArticles] = useState([]);

	useEffect(() => {
		const fetchRelatedArticles = async () => {
			if (article?.category) {
				try {
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

	return (
		<>
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
											{formatDate(related.published_at || related.created_at)}
										</p>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default RelatedArticles;

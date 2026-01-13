import { useMemo } from 'react';
import DOMPurify from 'dompurify';
import OptimizedImage from '../common/OptimizedImage';
import { TagIcon } from '../common/Icons';

const ArticleData = ({ article }) => {
	const purifiedContent = useMemo(() => {
		if (!article?.content) return '';
		const cleaned = article.content.replace(/\\"/g, '"');
		return DOMPurify.sanitize(cleaned);
	}, [article?.content]);

	const purifiedSecondaryContent = useMemo(() => {
		if (!article?.secondary_content) return '';
		const cleaned = article.secondary_content.replace(/\\"/g, '"');
		return DOMPurify.sanitize(cleaned);
	}, [article?.secondary_content]);

	return (
		<>
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

			{article.secondary_banner_image && (
				<figure className='mb-8'>
					<OptimizedImage
						src={article.secondary_banner_image}
						alt={article.title}
						className='w-full h-auto rounded-lg shadow-lg'
						onError={(e) => {
							e.target.style.display = 'none';
						}}
					/>
				</figure>
			)}
			{article.secondary_content && (
				<div className='editor-content prose prose-lg max-w-none mb-12'>
					<div
						className='text-gray-800 leading-relaxed'
						dangerouslySetInnerHTML={{
							__html: purifiedSecondaryContent,
						}}
					/>
				</div>
			)}

			{article.related_keywords && article.related_keywords.length > 0 && (
				<div className='border-t border-gray-300 pt-6 mb-8 flex flex-wrap gap-4'>
					<div className='text-sm flex flex-wrap gap-2'>
						{article.related_keywords.map((keyword, index) => (
							<span
								key={`${keyword}-${index}`}
								className='flex items-center justify-center gap-1 px-2 py-1 bg-gray-500 text-white rounded'
							>
								<TagIcon size={14} />
								{keyword}
							</span>
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default ArticleData;

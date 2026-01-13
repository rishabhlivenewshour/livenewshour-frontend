import { calculateReadTime, formatDate } from '../../utils/CommonFunctions';
import { CalendarIcon, ClockIcon, TagIcon, UserIcon } from '../common/Icons';

const ArticleInfo = ({ article }) => {
	return (
		<>
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
						<span className='font-semibold ml-2'>{article.category_name}</span>
					</div>
				)}
				<div className='flex px-3 py-2 bg-blue-200 text-gray-800 text-xs font-semibold rounded'>
					<UserIcon size={16} />
					<span className='font-semibold ml-2'>{article.author}</span>
				</div>
				<div className='flex items-center gap-2 text-sm text-gray-600'>
					<CalendarIcon size={16} />
					<span>{formatDate(article.published_at || article.created_at)}</span>
				</div>
				<div className='flex items-center gap-2 text-sm text-gray-600'>
					<ClockIcon size={16} />
					<span>{calculateReadTime(article.content)} min read</span>
				</div>
			</div>
		</>
	);
};

export default ArticleInfo;

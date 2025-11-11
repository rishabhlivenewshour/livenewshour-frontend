import { Link } from 'react-router-dom';
import { formatDate } from '../utils/CommonFunctions';

const BreakingNews = ({ breakingNews }) => {
	return (
		<div className='w-full h-full'>
			{breakingNews && (
				<Link
					to={`/news/articles/${breakingNews.slug}`}
					className='flex flex-col tracking-wide'
				>
					<img
						src={breakingNews.banner_image}
						alt={breakingNews.title}
						className='w-full h-[320px] object-cover rounded'
						onError={(e) => {
							e.target.style.display = 'none';
						}}
					/>
					<div className='mt-2'>
						<h2 className='w-full font-semibold text-xl tracking-wider'>
							{breakingNews.title}
						</h2>
						<p className='w-[90%] text-base text-light h-13 overflow-hidden line-clamp-2'>
							{breakingNews.summary}
						</p>
					</div>

					<div className='flex justify-between text-sm mt-2'>
						<p className='font-semibold text-primary'>
							{breakingNews.category_name}
						</p>
						<p className='text-light'>
							{breakingNews.author +
								' | ' +
								formatDate(breakingNews.published_at)}
						</p>
					</div>
				</Link>
			)}
		</div>
	);
};

export default BreakingNews;
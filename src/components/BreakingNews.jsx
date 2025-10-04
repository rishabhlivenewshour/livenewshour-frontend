import { Link } from 'react-router-dom';
import { formatDate } from '../utils/CommonFunctions';
import { Loader } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectCategories } from '../features/categories/categorySelector';
import { getCategoryNameById } from '../service/commonFunctions';

const BreakingNews = ({ breakingNews }) => {
	const categories = useSelector(selectCategories);

	return (
		<div className='w-full h-full flex items-center justify-center'>
			{breakingNews ? (
				<Link
					to={`/news/articles/${breakingNews.slug}`}
					className='flex flex-col tracking-wide'
				>
					<img
						src={breakingNews.banner_image}
						alt='Featured article'
						className='w-[100%] h-[320px] object-cover rounded'
					/>
					<div className='mt-2'>
						<h2 className='font-semibold text-xl tracking-wider'>
							{breakingNews.title}
						</h2>
						<p className='w-full text-base text-light h-13 overflow-hidden line-clamp-2'>
							{breakingNews.summary}
						</p>
					</div>

					<div className='flex justify-between text-sm mt-2'>
						<p className='font-semibold text-primary'>
							{getCategoryNameById(categories, breakingNews.category)}
						</p>
						<p className='text-light'>
							{breakingNews.author +
								' | ' +
								formatDate(breakingNews.published_at)}
						</p>
					</div>
				</Link>
			) : (
				<div className='text-center flex items-center justify-center w-full min-h-[350px] '>
					<Loader
						className='animate-spin text-red-600 mx-auto mb-4'
						size={48}
					/>
				</div>
			)}
		</div>
	);
};

export default BreakingNews;

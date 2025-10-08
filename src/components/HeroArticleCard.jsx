import { Loader } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { selectCategories } from '../features/categories/categorySelector';
import { useSelector } from 'react-redux';
import { getCategoryNameById } from '../service/commonFunctions';
import OptimizedImage from './OptimizedImage';

const HeroArticleCard = ({ article }) => {
	const categories = useSelector(selectCategories);

	return (
		<div className='h-fit min-h-[120px] w-fit min-w-[150px]'>
			{article ? (
				<Link
					to={`/news/articles/${article.slug}`}
					key={article.id}
					className='flex gap-3'
				>
					<img
						src={article.banner_image}
						alt={article.title}
						className='w-[100px] h-[100px] object-cover rounded'
						onError={(e) => {
							e.target.style.display = 'none';
						}}
					/>
					<div className=''>
						<h2 className='font-semibold'>{article.title}</h2>
						<p className='w-full text-sm text-light h-15 overflow-hidden line-clamp-3'>
							{article.summary}
						</p>
						<p className='font-semibold text-xs text-primary'>
							{getCategoryNameById(categories, article.category)}
						</p>
					</div>
				</Link>
			) : (
				<div className='text-center flex items-center justify-center'>
					<Loader
						className='animate-spin text-red-600 mx-auto mb-4'
						size={18}
					/>
				</div>
			)}
		</div>
	);
};

export default HeroArticleCard;

import React from 'react';
import { Link } from 'react-router-dom';

const HeroArticleCard = ({ article }) => {
	return (
		<div className='h-fit min-h-[120px] w-fit min-w-[150px]'>
			{article && (
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
							{article.category_name}
						</p>
					</div>
				</Link>
			)}
		</div>
	);
};

export default HeroArticleCard;
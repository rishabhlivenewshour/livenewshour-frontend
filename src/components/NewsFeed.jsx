import { Link } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';

const NewsFeed = ({ heading, newsArray }) => {
	return (
		<div className=''>
			<h1 className='text-xl font-semibold tracking-wider text-dark border-l-4 border-primary py-0.5 px-3 mb-5 uppercase'>
				{heading}
			</h1>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-10 text-sm tracking-wide'>
				{newsArray.map((article) => (
					<Link
						to={`/news/articles/${article.slug}`}
						key={article.id}
						className='group flex flex-col gap-2 rounded'
					>
						<div className='flex gap-2'>
							<OptimizedImage
								src={article.banner_image}
								alt={article.title}
								className='w-full h-[200px] object-cover rounded'
								onError={(e) => {
									e.target.style.display = 'none';
								}}
							/>
						</div>

						<h2 className='font-semibold group-hover:text-primary  rounded transition-all duration-150 ease-in-out'>
							{article.title}
						</h2>
						<div className=''>
							<p className='w-full text-sm text-light h-15 overflow-hidden line-clamp-3'>
								{article.summary}
							</p>
							<p className='font-semibold text-xs text-primary mt-1'>
								{article.category_name}
							</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default NewsFeed;

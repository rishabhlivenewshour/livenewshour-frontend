import { useEffect, useState } from 'react';
import { fetchArticlesByCategory } from '../features/articles/articleThunks';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const NewsFeedByCategory = ({ category }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [categoryArticles, setCategoryArticles] = useState([]);

	const fetchArticles = async () => {
		const data = await dispatch(fetchArticlesByCategory(category.id)).unwrap();
		setCategoryArticles(data?.slice(0, 4) || []);
	};

	useEffect(() => {
		if (category?.id) fetchArticles();
	}, [category]);

	if (!categoryArticles.length) return null;

	return (
		<div>
			<div className='flex justify-between'>
				<h1 className='text-sm font-semibold  px-2 tracking-wider text-dark border-l-4 border-primary py-[1px] mb-5 uppercase'>
					{category.name}
				</h1>
				{categoryArticles.length > 4 && (
					<button
						className='flex gap-0.5 justify-center py-[2px] hover:text-primary transition'
						onClick={() => navigate(`/news/${category.slug}`)}
					>
						<span className='text-xs'>View all</span>
						<ChevronRight size={15} />
					</button>
				)}
			</div>

			<div className='flex flex-col gap-3'>
				<Link
					to={`/news/articles/${categoryArticles[0].slug}`}
					key={categoryArticles[0].id}
					className='flex flex-col gap-2 rounded transition-all duration-150 ease-in-out group'
				>
					<img
						src={categoryArticles[0].banner_image}
						alt={categoryArticles[0].title}
						className='w-full h-auto max-w-[300px]'
					/>
					<h2 className='text-sm font-[500]  max-w-[300px] group-hover:text-primary'>
						{categoryArticles[0].title}
					</h2>
				</Link>
				{categoryArticles.slice(1, 4).map((article) => (
					<Link
						to={`/news/articles/${article.slug}`}
						key={article.id}
						className='flex flex-col gap-2 py-1.5 rounded hover:text-primary border-t border-gray-300 transition-all duration-150 ease-in-out'
					>
						<h2 className='text-[15px] font-[400]  max-w-[300px] mt-2'>{article.title}</h2>
					</Link>
				))}
			</div>
		</div>
	);
};

export default NewsFeedByCategory;

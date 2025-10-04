import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectArticles } from '../features/articles/articleSelector';
import { useEffect, useState } from 'react';
import { getAllArticlesByCategory } from '../service/commonFunctions';
const SideNewsFeed = ({ category, categoryId }) => {
	const [filteredArticles, setFilteredArticles] = useState([]);
	const articles = useSelector(selectArticles);

	useEffect(() => {
		const articleByCat = getAllArticlesByCategory(articles, categoryId);
		setFilteredArticles(articleByCat);
	}, [articles, categoryId]);

	return (
		<div>
			<h1 className='text-sm font-semibold tracking-wider text-dark border-l-4 border-primary py-[1px] px-2 mb-5 uppercase'>
				{category}
			</h1>
			<div className='flex flex-col gap-5'>
				{filteredArticles.map((article) => (
					<Link
						to={`/news/articles/${article.slug}`}
						key={article.id}
						className='flex flex-col gap-2 py-1.5 px-2 rounded hover:bg-gray-100 transition-all duration-150 ease-in-out'
					>
						<h2 className='text-[15px] font-[500]'>{article.title}</h2>
					</Link>
				))}
			</div>
		</div>
	);
};

export default SideNewsFeed;

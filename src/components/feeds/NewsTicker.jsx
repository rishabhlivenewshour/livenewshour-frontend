import { Link } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import { useEffect, useState } from 'react';
import { apiClient } from '../../service/apiClient';

const NewsTicker = () => {
	const [latestArticles, setLatestArticles] = useState([]);

	useEffect(() => {
		const fetchLatestArticles = async () => {
			try {
				const data = await apiClient(
					`/news/articles/?is_published=true&page=${1}&page_size=${10}`
				);

				const filteredData = data?.results.map((article) => ({
					id: article.id,
					title: article.title,
					slug: article.slug,
				}));

				console.log('filteredData:' + filteredData);

				setLatestArticles(filteredData);
			} catch (error) {
				console.error('Failed to fetch lastest articles:', error);
			}
		};
		fetchLatestArticles();
	}, []);

	if (!latestArticles.length) return null;

	return (
		<div className='w-full bg-primary text-white shadow-sm pt-0.5 pb-1'>
			<div className='flex'>
				<p className='h-full px-3 text-base bg-primary'>Latest</p>
				<Marquee className=''>
					{[...latestArticles].map((article, index) => (
						<Link
							key={index}
							to={`/news/articles/${article.slug}`}
							className='text-sm font-semibold mx-4 hover:text-white/90 transition'
						>
							{/* <span className='absolute top-0 left-[-20px] opacity-60 -rotate-30'>Latest</span> */}
							<span className=''>{article.title}</span>
						</Link>
					))}
				</Marquee>
			</div>
		</div>
	);
};

export default NewsTicker;

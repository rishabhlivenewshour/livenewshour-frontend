import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCategories } from '../features/categories/categorySelector';

const SideMenu = ({ setShowMenu }) => {
	const location = useLocation().pathname;
	const navigate = useNavigate();

	const categories = useSelector(selectCategories);

	const handleClick = (category_slug) => {
		navigate(`/news/topics/${category_slug}`);
		setShowMenu(false);
	};
	return (
		<aside className='sm:w-full sm:min-w-[250px] w-[100vw] h-fit min-h-screen overflow-y-auto bg-white shadow-lg tracking-wider'>
			<ul className='text-sm font-semibold pr-3 pl-1'>
				<li
					className={`py-2 pl-2 ${
						location === '/' && 'border-l-4 border-primary text-primary'
					}`}
				>
					<NavLink to='/' onClick={() => setShowMenu(false)}>
						Home
					</NavLink>
				</li>

				{categories.map((category, index) => (
					<li
						key={index}
						className={`border-t border-gray-300 ${
							location.includes(category.slug) &&
							'border-l-4 border-l-primary text-primary'
						}`}
					>
						<button
							onClick={() => handleClick(category.slug)}
							className='w-full flex items-center justify-between gap-2'
						>
							<span
								className={`py-2 pl-2 ${
									location.includes(category.name) &&
									'border-l-4 border-primary text-primary'
								}`}
							>
								{category.name}
							</span>
						</button>
					</li>
				))}
			</ul>
		</aside>
	);
};

export default SideMenu;

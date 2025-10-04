import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectCategories } from '../features/categories/categorySelector';

const SideMenu = ({ setShowMenu }) => {
	const location = useLocation().pathname;
	const [expanded, setExpanded] = useState(null);

	const categories = useSelector(selectCategories);

	const toggle = (category) => {
		setExpanded(expanded === category ? null : category);
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

				{categories.map((category) => (
					<li key={category.id} className='border-t'>
						<button
							onClick={() => toggle(category.name)}
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
							{expanded === category.name ? (
								<FaChevronUp size={12} />
							) : (
								<FaChevronDown size={12} />
							)}
						</button>

						{expanded === category.name && (
							<ul className='pl-3 pt-2 pb-1 space-y-1 font-normal text-light border-t'>
								<li className='font-semibold p-1 hover:text-black cursor-pointer active:scale-95 transition-all duration-300 ease-in-out'>
									<NavLink
										to={`/news/${category.slug}`}
										onClick={() => setShowMenu(false)}
									>
										{category.name}
									</NavLink>
								</li>
								{category.subcategories?.map((sub) => (
									<li
										key={sub.id}
										className='p-1 hover:text-black cursor-pointer active:scale-95 transition-all duration-300 ease-in-out'
									>
										<NavLink
											to={`/news/${category.slug}/${sub.slug}`}
											onClick={() => setShowMenu(false)}
										>
											{sub.name}
										</NavLink>
									</li>
								))}
							</ul>
						)}
					</li>
				))}
			</ul>
		</aside>
	);
};

export default SideMenu;

import Logo from '../assets/livenewshour.png';
import MenuIcon from '../assets/menuicon.png';
import CloseIcon from '../assets/closeicon.png';

import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import SideMenu from './SideMenu';
import { processvalue } from '../utils/CommonFunctions';

import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import {
	selectCategories,
	selectCategoriesLoading,
} from '../features/categories/categorySelector';

const Navbar = () => {
	const location = useLocation().pathname;
	const [showMenu, setShowMenu] = useState(false);

	const categories = useSelector(selectCategories);
	const categoriesLoading = useSelector(selectCategoriesLoading);

	const toogleMenu = () => {
		setShowMenu(!showMenu);
	};

	return (
		<div className='relative w-full bg-back'>
			<nav className='relative flex items-center justify-between p-3 px-[5vw] pl-[2vw] sm:pr-[40px] shadow z-[100]'>
				<button
					onClick={toogleMenu}
					className='rounded-md hover:bg-gray-100 active:scale-95 transition-all duration-300 ease-in-out p-1'
				>
					<img
						src={showMenu ? CloseIcon : MenuIcon}
						alt=''
						className='h-8 lg:h-10 w-auto'
					/>
				</button>
				<NavLink
					to='/'
					onClick={() => setShowMenu(false)}
					className='absolute left-1/2 transform -translate-x-1/2'
				>
					<img src={Logo} alt='' className='h-7 lg:h-9 w-auto' />
				</NavLink>
				<NavLink
					to='/search'
					className='p-2 flex items-center justify-center rounded bg-gray-100 active:scale-95 transition-all duration-300 ease-in-out hover:bg-gray-200'
				>
					<FaSearch size={20} />
				</NavLink>
			</nav>
			<div className={`${showMenu ? 'block' : 'hidden'} absolute left-0 z-10`}>
				<SideMenu setShowMenu={setShowMenu} />
			</div>
			<div
				className={`${showMenu && 'block'} lg:hidden p-0.5 bg-primary`}
			></div>
			<div
				className={`hidden lg:flex items-center justify-center px-[10px] m-auto bg-primary text-back text-sm tracking-wider font-semibold`}
			>
				{!categoriesLoading && (
					<>
						{categories.slice(0, 6).map((item, index) => (
							<NavLink
								key={index}
								to={`/news/${item.slug}`}
								className='flex flex-col justify-between items-center hover:bg-[#C00000] active:scale-95 transition-all duration-300 ease-in-out'
							>
								<p className='p-2 px-4'>{item.name?.toUpperCase()}</p>
								<p
									className={`bg-back w-full h-[2px] ${
										location.includes(processvalue(item.name))
											? 'block'
											: 'hidden'
									}`}
								></p>
							</NavLink>
						))}
						<button onClick={() => setShowMenu(true)}>
							<p className='p-2 pl-3 hover:bg-[#C00000] active:scale-95 transition-all duration-300 ease-in-out'>
								MORE
							</p>
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default Navbar;

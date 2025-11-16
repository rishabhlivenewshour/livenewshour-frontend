import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import SideMenu from './SideMenu';
import Logo from './Logo';
import { MenuIcon, SearchIcon, XIcon } from './Icons';

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
			<nav className='relative flex items-center justify-between p-3 px-[5vw] pl-[2vw] sm:pr-[40px] z-[100] bg-primary h-[70px] lg:h-[85px]'>
				<button
					onClick={toogleMenu}
					className={`rounded-md active:scale-95 transition-all duration-300 ease-in-out p-1 border-2 ${
						!showMenu ? 'border-transparent' : 'border-white'
					}  hover:border-white`}
					aria-label='Menu button'
				>
					{/* <OptimizedImage
						src={showMenu ? CloseIcon : MenuIcon}
						alt={'Menu'}
						className='h-8 lg:h-10 w-auto max-w-[100px]'
						onError={(e) => {
							e.target.style.display = 'none';
						}}
					/> */}
					{!showMenu ? (
						<MenuIcon size={28} className='text-white' />
					) : (
						<XIcon size={28} className='text-white' />
					)}
				</button>
				<NavLink
					to='/'
					onClick={() => setShowMenu(false)}
					className='absolute left-1/2 transform -translate-x-1/2 '
					aria-label='Logo'
				>
					{/* <img
						src={Logo}
						alt={'Live News Hour'}
						className='h-[55px] lg:h-[75px] w-auto max-w-[250px]'
						onError={(e) => {
							e.target.style.display = 'none';
						}}
					/> */}
					<Logo />
				</NavLink>
				<NavLink
					to='/search'
					className='p-2 flex items-center justify-center rounded bg-gray-100 active:scale-95 transition-all duration-300 ease-in-out hover:bg-gray-200'
					aria-label='Search'
				>
					<SearchIcon size={20} />
				</NavLink>
			</nav>
			<div className={`${showMenu ? 'block' : 'hidden'} absolute left-0 z-10`}>
				<SideMenu setShowMenu={setShowMenu} />
			</div>

			<div
				className={`hidden lg:flex items-center justify-center px-[5px] m-auto bg-white text-black text-[14px] mt-3 pb-2 shadow-sm tracking-wide font-[400]`}
			>
				{!categoriesLoading && (
					<>
						{[...categories]
							.reverse()
							.slice(0, 6)
							.map((item, index) => (
								<NavLink
									key={index}
									to={`/news/topics/${item.slug}`}
									onClick={() => setShowMenu(false)}
									className='flex flex-col justify-between items-center hover:text-primary active:text-primary transition-all duration-300 ease-in-out w-fit border-r-2 border-gray-400'
								>
									<p className='px-4'>{item.name}</p>
									<p
										className={`bg-back w-full h-[2px] ${
											location.includes(item.slug) ? 'block' : 'hidden'
										}`}
									></p>
								</NavLink>
							))}
						<button onClick={() => setShowMenu(true)}>
							<p className='pl-3 hover:text-primary active:scale-95 transition-all duration-300 ease-in-out w-fit'>
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

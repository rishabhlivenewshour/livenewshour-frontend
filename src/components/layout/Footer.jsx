import { Link } from 'react-router-dom';
import { processvalue } from '../../utils/CommonFunctions';

import Logo from '../common/Logo';
import { useSelector } from 'react-redux';
import { selectCategories } from '../../features/categories/categorySelector';
import { FacebookIcon, InstagramIcon, XTwitterIcon } from '../common/Icons';

const Footer = () => {
	const categories = useSelector(selectCategories);
	return (
		<div>
			<div className='py-10 px-[20px] sm:px-[40px] flex flex-wrap justify-between text-light gap-3 text-sm border-t-2'>
				<div className='w-full sm:w-1/4 relative'>
					<Link
						to='/'
						className='absolute left-[-40px] sm:left-[-20px] top-[-30px]'
						aria-label='Logo'
					>
						{/* <OptimizedImage
							src={Logo}
							alt={'Live News Hour'}
							className='h-20 w-auto space-y-1 max-w-[250px]'
							onError={(e) => {
								e.target.style.display = 'none';
							}}
						/> */}
						<Logo />
					</Link>
					<p className='w-full mt-12 sm:mt-15'>
						LiveNewsHour brings you the latest news from around the world —
						fast, accurate, and unbiased. Stay informed with expert insights,
						trending stories, and real-time updates.
					</p>
				</div>
				<div>
					<p className='font-bold mb-2 text-dark'>Sections</p>
					<ul className='space-y-1'>
						{[...categories]
							.reverse()
							.slice(0, 6)
							.map((section, index) => (
								<li
									key={index}
									className='hover:text-primary cursor-pointer active:scale-95 transition-all duration-300 ease-in-out'
								>
									<Link to={`/news/topics/${section.slug}`}>
										{section.name}
									</Link>
								</li>
							))}
					</ul>
				</div>

				{/* Section 2: Company Info */}
				<div>
					<p className='font-bold mb-2 text-dark'>Company</p>
					<ul className='space-y-1'>
						{['About Us', 'Contact', 'Careers', 'Press', 'Advertise'].map(
							(item, index) => (
								<li
									key={index}
									className='hover:text-primary cursor-pointer active:scale-95 transition-all duration-300 ease-in-out'
								>
									<Link to={`/${processvalue(item)}`}>{item}</Link>
								</li>
							)
						)}
					</ul>
				</div>

				{/* Section 3: Legal */}
				<div>
					<p className='font-bold mb-2 text-dark'>Legal</p>
					<ul className='space-y-1'>
						{['Terms of Use', 'Privacy Policy', 'Cookie Policy'].map(
							(item, index) => (
								<li
									key={index}
									className='hover:text-primary cursor-pointer active:scale-95 transition-all duration-300 ease-in-out'
								>
									<Link to={`/${processvalue(item)}`}>{item}</Link>
								</li>
							)
						)}
					</ul>
				</div>

				{/* Section 4: Newsletter */}
				<div>
					{/* <p className='font-bold mb-2 text-dark'>Newsletter</p>
					<p className='mb-2'>Stay informed with our top headlines.</p>
					<div className='flex w-full'>
						<input
							type='email'
							placeholder='Enter your email'
							className='p-2 rounded-l-md text-dark w-full border border-r-0 border-gray-400 focus:outline-none'
						/>
						<button className='bg-primary px-4 rounded-r-md text-back'>
							Subscribe
						</button>
					</div> */}
					<p className='font-semibold mb-2 text-dark'>
						Follow us on Social Media
					</p>
					<div className='flex gap-5 text-gray-400'>
						<Link
							to='https://www.facebook.com/profile.php?id=61584092181307'
							target='_blank'
							rel='noopener noreferrer'
							aria-label='Visit our Facebook page'
							className='h-[42px] w-[42px] flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 transition text-sm font-semibold'
						>
							<FacebookIcon size={24} className='' />
						</Link>
						<Link
							to='https://www.instagram.com/livenewshour'
							target='_blank'
							rel='noopener noreferrer'
							aria-label='Visit our Instagram profile'
							className='h-[42px] w-[42px] flex items-center justify-center bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white rounded-full hover:bg-[#8C3AAA] transition text-sm font-semibold'
						>
							<InstagramIcon size={24} className='' />
						</Link>
						<Link
							to='https://x.com/livenewshour'
							target='_blank'
							rel='noopener noreferrer'
							aria-label='Visit our X handle'
							className='h-[42px] w-[42px] flex items-center justify-center bg-gray-800 text-white rounded-full hover:bg-gray-900 transition text-sm font-semibold'
						>
							<XTwitterIcon size={24} className='' />
						</Link>
						{/* <Link
							to='https://youtube.com'
							target='_blank'
							rel='noopener noreferrer'
							aria-label='Visit our Youtube channel'
						>
							<YoutubeIcon size={25} className='text-primary hover:text-dark' />
						</Link>
						<Link
							to='https://linkedin.com'
							target='_blank'
							rel='noopener noreferrer'
							aria-label='Visit our Linkedin page'
						>
							<LinkedinIcon
								size={25}
								className='text-primary hover:text-dark'
							/>
						</Link> */}
					</div>
				</div>
			</div>
			<div className='py-3 text-sm text-light border-t-2 text-center'>
				<p>Copyright 2025 @LiveNewsHour - All Right Reserved.</p>
			</div>
		</div>
	);
};

export default Footer;

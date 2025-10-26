import { Link } from 'react-router-dom';
import Logo from '../assets/livenewshour.jpeg';
import { processvalue } from '../utils/CommonFunctions';
import OptimizedImage from './OptimizedImage';
import {
	Facebook,
	Instagram,
	Linkedin,
	Youtube,
	createLucideIcon,
} from 'lucide-react';

const XIcon = createLucideIcon('X', [
	[
		'path',
		{
			key: 'path1',
			d: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z',
			stroke: 'none',
			fill: 'currentColor',
		},
	],
]);

const Footer = () => {
	return (
		<div>
			<div className='py-10 px-[20px] sm:px-[40px] flex flex-wrap justify-between text-light gap-3 text-sm border-t-2'>
				<div className='w-full sm:w-1/4'>
					<Link to='/'>
						<OptimizedImage
							src={Logo}
							alt={'Live News Hour'}
							className='h-20 w-auto space-y-1 max-w-[250px]'
							onError={(e) => {
								e.target.style.display = 'none';
							}}
						/>
					</Link>
					<p className='w-full mt-2'>
						LiveNewsHour brings you the latest news from around the world —
						fast, accurate, and unbiased. Stay informed with expert insights,
						trending stories, and real-time updates.
					</p>
				</div>
				<div>
					<p className='font-bold mb-2 text-dark'>Sections</p>
					<ul className='space-y-1'>
						{[
							'World',
							'Politics',
							'Business',
							'Technology',
							'Sports',
							'Health',
						].map((section, index) => (
							<li
								key={index}
								className='hover:text-primary cursor-pointer active:scale-95 transition-all duration-300 ease-in-out'
							>
								<Link to={`/${processvalue(section)}`}>{section}</Link>
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
					<p className='font-bold mb-2 text-dark'>Newsletter</p>
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
					</div>
					<p className='font-semibold mb-2 text-dark mt-3'>
						Follow us on Social Media
					</p>
					<div className='flex gap-5 text-gray-400'>
						<Link
							to='https://facebook.com'
							target='_blank'
							rel='noopener noreferrer'
							aria-label='Visit our Facebook page'
						>
							<Facebook size={25} className='text-primary hover:text-dark' />
						</Link>
						<Link
							to='https://x.com'
							target='_blank'
							rel='noopener noreferrer'
							aria-label='Visit our X handle'
						>
							<XIcon size={25} className='text-primary hover:text-dark' />
						</Link>
						<Link
							to='https://instagram.com'
							target='_blank'
							rel='noopener noreferrer'
							aria-label='Visit our Instagram profile'
						>
							<Instagram size={25} className='text-primary hover:text-dark' />
						</Link>
						<Link
							to='https://youtube.com'
							target='_blank'
							rel='noopener noreferrer'
							aria-label='Visit our Youtube channel'
						>
							<Youtube size={25} className='text-primary hover:text-dark' />
						</Link>
						<Link
							to='https://linkedin.com'
							target='_blank'
							rel='noopener noreferrer'
							aria-label='Visit our Linkedin page'
						>
							<Linkedin size={25} className='text-primary hover:text-dark' />
						</Link>
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

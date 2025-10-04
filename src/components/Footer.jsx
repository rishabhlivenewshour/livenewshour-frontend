import { Link } from 'react-router-dom';
import Logo from '../assets/livenewshour.png';
import {
	FaFacebook,
	FaInstagram,
	FaLinkedin,
	FaTwitter,
	FaYoutube,
} from 'react-icons/fa';
import { processvalue } from '../utils/CommonFunctions';

const Footer = () => {
	return (
		<div>
			<div className='py-10 px-[20px] sm:px-[40px] flex flex-wrap justify-between text-light gap-3 text-sm border-t-2'>
				<div className='w-full sm:w-1/4'>
					<Link to='/'>
						<img
							loading='lazy'
							className='h-8 w-auto space-y-1'
							src={Logo}
							alt='TrendFusion logo'
						/>
					</Link>
					<p className='w-full mt-2'>
						LiveNewsHour brings you the latest news from around the world —
						fast, accurate, and unbiased. Stay informed with expert insights,
						trending stories, and real-time updates.
					</p>
				</div>
				<div>
					<h4 className='font-bold mb-2 text-dark'>Sections</h4>
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
					<h4 className='font-bold mb-2 text-dark'>Company</h4>
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
					<h4 className='font-bold mb-2 text-dark'>Legal</h4>
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
					<h4 className='font-bold mb-2 text-dark'>Newsletter</h4>
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
					<h4 className='font-semibold mb-2 text-dark mt-3'>
						Follow us on Social Media
					</h4>
					<div className='flex gap-5 text-gray-400'>
						<Link
							to='https://facebook.com'
							target='_blank'
							rel='noopener noreferrer'
							className=''
						>
							<FaFacebook size={25} className='text-primary hover:text-dark' />
						</Link>
						<Link
							to='https://twitter.com'
							target='_blank'
							rel='noopener noreferrer'
						>
							<FaTwitter size={25} className='text-primary hover:text-dark' />
						</Link>
						<Link
							to='https://instagram.com'
							target='_blank'
							rel='noopener noreferrer'
						>
							<FaInstagram size={25} className='text-primary hover:text-dark' />
						</Link>
						<Link
							to='https://youtube.com'
							target='_blank'
							rel='noopener noreferrer'
						>
							<FaYoutube size={25} className='text-primary hover:text-dark' />
						</Link>
						<Link
							to='https://linkedin.com'
							target='_blank'
							rel='noopener noreferrer'
						>
							<FaLinkedin size={25} className='text-primary hover:text-dark' />
						</Link>
					</div>
				</div>
			</div>
			<div className='py-3 text-sm text-light border-t-2 text-center'>
				<p>Copyright 2025 @NewsFactory - All Right Reserved.</p>
			</div>
		</div>
	);
};

export default Footer;

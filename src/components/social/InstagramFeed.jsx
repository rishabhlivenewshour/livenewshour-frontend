import { useEffect } from 'react';

function InstagramIcon({ size = 24 }) {
	return (
		<svg width={size} height={size} viewBox='0 0 24 24' fill='currentColor'>
			<path d='M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 2 .3 2.4.5.6.2 1 .5 1.5 1s.8.9 1 1.5c.2.4.4 1.2.5 2.4.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.3 2-.5 2.4-.2.6-.5 1-1 1.5s-.9.8-1.5 1c-.4.2-1.2.4-2.4.5-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-2-.3-2.4-.5-.6-.2-1-.5-1.5-1s-.8-.9-1-1.5c-.2-.4-.4-1.2-.5-2.4C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.3-2 .5-2.4.2-.6.5-1 1-1.5s.9-.8 1.5-1c.4-.2 1.2-.4 2.4-.5C8.4 2.2 8.8 2.2 12 2.2m0-2C8.7.2 8.3.2 7 .3 5.7.4 4.7.7 3.9 1c-.9.4-1.7.9-2.5 1.7C.7 3.5.2 4.3 0 5.2c-.3.8-.6 1.8-.7 3.1C-.8 9.6-.8 10-.8 12s0 2.4.1 3.7c.1 1.3.4 2.3.7 3.1.4.9.9 1.7 1.7 2.5.8.8 1.6 1.3 2.5 1.7.8.3 1.8.6 3.1.7 1.3.1 1.7.1 3.7.1s2.4 0 3.7-.1c1.3-.1 2.3-.4 3.1-.7.9-.4 1.7-.9 2.5-1.7.8-.8 1.3-1.6 1.7-2.5.3-.8.6-1.8.7-3.1.1-1.3.1-1.7.1-3.7s0-2.4-.1-3.7c-.1-1.3-.4-2.3-.7-3.1-.4-.9-.9-1.7-1.7-2.5C20.5.7 19.7.2 18.8 0 18 .3 17 .6 15.7.7 14.4.8 14 .8 12 .8z' />
			<circle cx='12' cy='12' r='3.5' />
			<circle cx='17.5' cy='6.5' r='1.5' />
		</svg>
	);
}

export default function InstagramFeed({
	profileUrl = 'https://www.instagram.com/livenewshour/',
	profileName = 'livenewshour',
}) {
	useEffect(() => {
		// Load Instagram embed script
		if (window.instgrm) {
			window.instgrm.Embeds.process();
			return;
		}

		const script = document.createElement('script');
		script.src = 'https://www.instagram.com/embed.js';
		script.async = true;
		script.defer = true;

		document.body.appendChild(script);

		return () => {
			// Cleanup is safe but not needed
		};
	}, []);

	return (
		<div className='w-full mx-auto mt-8'>
			<div className='bg-white rounded-lg shadow-lg overflow-hidden'>
				{/* Header */}
				<div className='bg-gradient-to-r from-pink-600 to-purple-600 p-4'>
					<div className='flex items-center gap-3 text-white'>
						<InstagramIcon size={28} />
						<div>
							<h3 className='font-bold text-lg'>Follow Us on Instagram</h3>
							<p className='text-sm opacity-90'>{profileName}</p>
						</div>
					</div>
				</div>

				{/* Embed */}
				<div className='p-6 bg-gray-50'>
					<blockquote
						className='instagram-media w-full'
						data-instgrm-permalink={profileUrl}
						data-instgrm-version='14'
					>
						<div className='flex flex-col items-center justify-center py-20 text-gray-500'>
							<div className='animate-spin rounded-full h-10 w-10 border-b-2 border-pink-600 mb-3'></div>
							<p className='text-sm'>Loading Instagram feed...</p>
						</div>
					</blockquote>
				</div>

				{/* Visit Button */}
				<div className='p-4 bg-white border-t border-gray-200'>
					<a
						href={profileUrl}
						target='_blank'
						rel='noopener noreferrer'
						className='flex items-center justify-center gap-2 w-full py-3 px-4 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-semibold transition-colors shadow-sm hover:shadow-md'
					>
						<InstagramIcon size={18} />
						Visit Our Instagram Profile
					</a>
				</div>
			</div>
		</div>
	);
}

import { useEffect } from 'react';

function FacebookIcon({ size = 24 }) {
	return (
		<svg width={size} height={size} viewBox='0 0 24 24' fill='currentColor'>
			<path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
		</svg>
	);
}
const FacebookFeed = ({
	pageUrl = 'https://www.facebook.com/facebook',
	pageName = 'livenewshour',
}) => {
	useEffect(() => {
		// Load Facebook SDK
		if (window.FB) {
			window.FB.XFBML.parse();
			return;
		}

		// Initialize Facebook SDK
		window.fbAsyncInit = function () {
			window.FB.init({
				xfbml: true,
				version: 'v18.0',
			});
		};

		// Load the SDK script
		const script = document.createElement('script');
		script.id = 'facebook-jssdk';
		script.src = 'https://connect.facebook.net/en_US/sdk.js';
		script.async = true;
		script.defer = true;
		script.crossOrigin = 'anonymous';

		const firstScript = document.getElementsByTagName('script')[0];
		if (firstScript && firstScript.parentNode) {
			firstScript.parentNode.insertBefore(script, firstScript);
		}

		return () => {
			// Cleanup if needed
			delete window.fbAsyncInit;
		};
	}, []);

	return (
		<div className='w-full mx-auto mt-8'>
			<div className='bg-white rounded-lg shadow-lg overflow-hidden'>
				{/* Header */}
				<div className='bg-gradient-to-r from-blue-600 to-blue-700 p-4'>
					<div className='flex items-center gap-3 text-white'>
						<FacebookIcon size={28} />
						<div>
							<h3 className='font-bold text-lg'>Follow Us on Facebook</h3>
							<p className='text-sm opacity-90'>{pageName}</p>
						</div>
					</div>
				</div>

				{/* Facebook Page Plugin */}
				<div className='p-6 bg-gray-50'>
					<div id='fb-root'></div>
					<div
						className='fb-page'
						data-href={pageUrl}
						data-tabs='timeline'
						data-width='340'
						data-height='450'
						data-small-header='false'
						data-adapt-container-width='true'
						data-hide-cover='false'
						data-show-facepile='true'
					>
						<blockquote cite={pageUrl} className='fb-xfbml-parse-ignore'>
							<div className='flex flex-col items-center justify-center py-20 text-gray-500'>
								<div className='animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-3'></div>
								<p className='text-sm'>Loading Facebook feed...</p>
							</div>
						</blockquote>
					</div>
				</div>

				{/* Follow Button */}
				<div className='p-4 bg-white border-t border-gray-200'>
					<a
						href={pageUrl}
						target='_blank'
						rel='noopener noreferrer'
						className='flex items-center justify-center gap-2 w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-sm hover:shadow-md'
					>
						<FacebookIcon size={18} />
						Visit Our Facebook Page
					</a>
				</div>
			</div>
		</div>
	);
};

export default FacebookFeed;

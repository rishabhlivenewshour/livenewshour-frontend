import { useEffect, useState } from 'react';
import { ArrowUpIcon } from '../common/Icons';

const BackToTop = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const toggleVisibility = () => {
			// Show button when page is scrolled down 300px
			if (window.pageYOffset > 300) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		// Add scroll event listener
		window.addEventListener('scroll', toggleVisibility);

		// Cleanup
		return () => {
			window.removeEventListener('scroll', toggleVisibility);
		};
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	if (!isVisible) {
		return null;
	}

	return (
		<button
			onClick={scrollToTop}
			className='fixed bottom-8 right-8 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-secondary transition-all duration-300 transform hover:scale-110 z-50 animate-bounce-slow'
			aria-label='Back to top'
			title='Back to top'
		>
			<ArrowUpIcon size={24} />
		</button>
	);
};

export default BackToTop;

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

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
			className='fixed bottom-8 right-8 p-3 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-110 z-50 animate-bounce-slow'
			aria-label='Back to top'
			title='Back to top'
		>
			<ArrowUp size={24} />
		</button>
	);
};

export default BackToTop;

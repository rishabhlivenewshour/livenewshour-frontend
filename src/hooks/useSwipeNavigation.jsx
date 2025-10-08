import { useEffect } from 'react';

export const useSwipeNavigation = (onSwipeLeft, onSwipeRight) => {
	useEffect(() => {
		let touchStartX = 0;
		let touchEndX = 0;
		let touchStartY = 0;
		let touchEndY = 0;

		const handleTouchStart = (e) => {
			touchStartX = e.changedTouches[0].screenX;
			touchStartY = e.changedTouches[0].screenY;
		};

		const handleTouchEnd = (e) => {
			touchEndX = e.changedTouches[0].screenX;
			touchEndY = e.changedTouches[0].screenY;
			handleSwipe();
		};

		const handleSwipe = () => {
			const swipeThreshold = 75; // Minimum distance for swipe
			const verticalThreshold = 50; // Max vertical movement

			const horizontalDiff = touchEndX - touchStartX;
			const verticalDiff = Math.abs(touchEndY - touchStartY);

			// Only trigger if horizontal swipe is greater than vertical
			if (verticalDiff > verticalThreshold) {
				return; // Too much vertical movement, likely scrolling
			}

			// Swipe left (next)
			if (horizontalDiff < -swipeThreshold) {
				onSwipeLeft?.();
			}

			// Swipe right (previous)
			if (horizontalDiff > swipeThreshold) {
				onSwipeRight?.();
			}
		};

		// Add event listeners
		document.addEventListener('touchstart', handleTouchStart, {
			passive: true,
		});
		document.addEventListener('touchend', handleTouchEnd, { passive: true });

		// Cleanup
		return () => {
			document.removeEventListener('touchstart', handleTouchStart);
			document.removeEventListener('touchend', handleTouchEnd);
		};
	}, [onSwipeLeft, onSwipeRight]);
};

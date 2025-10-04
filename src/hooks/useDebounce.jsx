import { useEffect, useState } from 'react';

export const useDebounce = (value, delay = 500) => {
	const [debouncedValue, setDebouncedValue] = useState('');

	useEffect(() => {
		let timeoutId = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [value, delay]);
	return debouncedValue;
};

import { useState } from 'react';

const OptimizedImage = ({ src, alt, className = '', ...props }) => {
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(false);

	if (error) return null;

	return (
		<div className={`relative ${className}`}>
			{!loaded && (
				<div className='absolute inset-0 bg-gray-200 animate-pulse rounded' />
			)}
			<img
				src={src}
				alt={alt}
				className={`${className} ${
					loaded ? 'opacity-100' : 'opacity-0'
				} transition-opacity duration-300`}
				loading='lazy'
				onLoad={() => setLoaded(true)}
				onError={() => setError(true)}
				{...props}
			/>
			
		</div>
	);
};

export default OptimizedImage;

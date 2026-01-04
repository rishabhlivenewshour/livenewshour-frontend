const ArticleSkeleton = ({ variant = 'card' }) => {
	if (variant === 'card') {
		return (
			<div className='animate-pulse flex flex-col gap-2'>
				<div className='h-48 bg-gray-300 rounded mb-2'></div>
				<div className='h-6 bg-gray-300 rounded w-3/4 mb-2'></div>
				<div className='h-4 bg-gray-300 rounded w-full mb-1'></div>
				<div className='h-4 bg-gray-300 rounded w-2/3'></div>
			</div>
		);
	}

	if (variant === 'list') {
		return (
			<div className='animate-pulse flex gap-3'>
				<div className='w-full max-w-[250px] h-[100px] bg-gray-300 rounded'></div>
				<div className='flex-1'>
					<div className='h-5 bg-gray-300 rounded w-3/4 mb-2'></div>
					<div className='h-4 bg-gray-300 rounded w-full mb-1'></div>
					<div className='h-4 bg-gray-300 rounded w-2/3'></div>
				</div>
			</div>
		);
	}

	if (variant === 'hero') {
		return (
			<div className='animate-pulse'>
				<div className='h-[350px] bg-gray-300 rounded-lg mb-4'></div>
				<div className='h-8 bg-gray-300 rounded w-3/4 mb-3'></div>
				<div className='h-6 bg-gray-300 rounded w-full mb-2'></div>
				<div className='h-6 bg-gray-300 rounded w-5/6'></div>
			</div>
		);
	}

	if (variant === 'sidebar') {
		return (
			<div className='animate-pulse flex flex-col gap-3'>
				<div className='h-40 bg-gray-300 rounded'></div>
				<div className='h-4 bg-gray-300 rounded w-3/4'></div>
				<div className='h-4 bg-gray-300 rounded w-1/2'></div>
			</div>
		);
	}

	// Default skeleton
	return (
		<div className='animate-pulse'>
			<div className='h-48 bg-gray-300 rounded mb-4'></div>
			<div className='h-6 bg-gray-300 rounded w-3/4 mb-2'></div>
			<div className='h-4 bg-gray-300 rounded w-1/2'></div>
		</div>
	);
};

export default ArticleSkeleton;

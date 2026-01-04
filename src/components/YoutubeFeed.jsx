import { useState, useEffect } from 'react';
import { YoutubeIcon } from './Icons';

const YoutubeFeed = ({
	pageUrl = 'https://www.youtube.com/channel/UC40qOcI87k0K9xQOUxcBYJw',
	pageName = 'livenewshour',
}) => {
	const [videos, setVideos] = useState([]);
	const [loading, setLoading] = useState(true);

	const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;
	const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

	useEffect(() => {
		fetchVideos();
	}, []);

	const fetchVideos = async () => {
		try {
			const response = await fetch(
				`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10&type=video`
			);
			const data = await response.json();

			if (data.items) {
				setVideos(data.items);
			}
		} catch (error) {
			console.error('Error fetching YouTube videos:', error);
		} finally {
			setLoading(false);
		}
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const now = new Date();
		const diffTime = Math.abs(now - date);
		const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
		const diffMonths = Math.floor(diffDays / 30);

		if (diffDays === 0) return 'Today';
		if (diffDays === 1) return '1 day ago';
		if (diffDays < 30) return `${diffDays} days ago`;
		if (diffMonths === 1) return '1 month ago';
		if (diffMonths < 12) return `${diffMonths} months ago`;
		const years = Math.floor(diffMonths / 12);
		return years === 1 ? '1 year ago' : `${years} years ago`;
	};

	return (
		<div className='w-full mx-auto mt-8'>
			<div className='bg-white rounded-lg shadow-lg overflow-hidden'>
				{/* Header */}
				<div className='bg-gradient-to-r from-red-600 to-red-700 p-4'>
					<div className='flex items-center gap-3 text-white'>
						<YoutubeIcon size={28} />
						<div>
							<h3 className='font-bold text-lg'>Follow Us on YouTube</h3>
							<p className='text-sm opacity-90'>{pageName}</p>
						</div>
					</div>
				</div>

				{/* Scrollable Video Feed */}
				<div className='bg-gray-50'>
					{loading ? (
						<div className='flex items-center justify-center py-12'>
							<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-red-600'></div>
						</div>
					) : (
						<div className='max-h-[400px] overflow-y-auto'>
							{videos.map((video) => (
								<a
									key={video.id.videoId}
									href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
									target='_blank'
									rel='noopener noreferrer'
									className='block bg-white hover:bg-gray-50 transition-colors border-b border-gray-200 last:border-b-0'
								>
									<div className='p-3 flex gap-3'>
										{/* Video Thumbnail */}
										<div className='relative flex-shrink-0 w-40 h-24 bg-gray-900 rounded overflow-hidden group'>
											<img
												src={video.snippet.thumbnails.medium.url}
												alt={video.snippet.title}
												className='w-full h-full object-cover'
												referrerPolicy='no-referrer'
											/>
											{/* Play Icon Overlay */}
											<div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all'>
												<svg
													className='w-12 h-12 text-white opacity-80 group-hover:opacity-100 transform group-hover:scale-110 transition-all'
													fill='currentColor'
													viewBox='0 0 24 24'
												>
													<path d='M8 5v14l11-7z' />
												</svg>
											</div>
										</div>

										{/* Video Info */}
										<div className='flex-1 min-w-0'>
											<h4 className='font-medium text-gray-900 line-clamp-2 text-sm leading-snug mb-1'>
												{video.snippet.title}
											</h4>
											<p className='text-xs text-gray-500 mt-1'>
												{formatDate(video.snippet.publishedAt)}
											</p>
										</div>
									</div>
								</a>
							))}
						</div>
					)}
				</div>

				{/* Footer Button */}
				<div className='p-4 bg-white border-t border-gray-200'>
					<a
						href={pageUrl}
						target='_blank'
						rel='noopener noreferrer'
						className='flex items-center justify-center gap-2 w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors shadow-sm hover:shadow-md'
					>
						<YoutubeIcon size={18} />
						Visit Our YouTube Channel
					</a>
				</div>
			</div>
		</div>
	);
};

export default YoutubeFeed;

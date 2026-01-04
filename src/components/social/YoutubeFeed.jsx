import { useState, useEffect } from 'react';
import { YoutubeIcon } from '../common/Icons';

const YoutubeFeed = () => {
	const [videos, setVideos] = useState([]);
	const [channelInfo, setChannelInfo] = useState(null);
	const [loading, setLoading] = useState(true);

	const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;
	const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

	const pageUrl = `https://www.youtube.com/channel/${CHANNEL_ID}`;
	const pageName = 'livenewshour';

	useEffect(() => {
		fetchAll();
	}, []);

	const fetchAll = async () => {
		try {
			await Promise.all([fetchChannelInfo(), fetchVideos()]);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	const fetchChannelInfo = async () => {
		const res = await fetch(
			`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${CHANNEL_ID}&key=${API_KEY}`
		);
		const data = await res.json();
		if (data.items?.length) {
			setChannelInfo(data.items[0]);
		}
	};

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

	const formatSubs = (count) => {
		if (!count) return '';
		if (count >= 1_000_000)
			return `${(count / 1_000_000).toFixed(1)}M subscribers`;
		if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K subscribers`;
		return `${count} subscribers`;
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
				<div className='p-6 bg-gray-50 flex flex-col items-center justify-center'>
					<div className='w-full bg-gradient-to-r from-red-600 to-red-700 p-4'>
						<div className='flex items-center gap-4 text-white'>
							{channelInfo?.snippet?.thumbnails?.default?.url && (
								<img
									src={channelInfo.snippet.thumbnails.default.url}
									alt='Channel logo'
									className='w-12 h-12 rounded-full border border-white'
									referrerPolicy='no-referrer'
								/>
							)}

							<div>
								<h3 className='font-bold text-lg leading-tight'>
									{channelInfo?.snippet?.title || 'YouTube'}
								</h3>
								<p className='text-sm opacity-90'>
									{formatSubs(channelInfo?.statistics?.subscriberCount)}
								</p>
							</div>
						</div>
					</div>
					<div className='bg-white border border-gray-200'>
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
										<div className='p-3 flex gap-4 items-start group'>
											{/* Thumbnail */}
											<div className='relative w-36 h-20 flex-shrink-0 rounded-md overflow-hidden bg-black'>
												<img
													src={
														video.snippet.thumbnails?.medium?.url ||
														video.snippet.thumbnails?.default?.url
													}
													alt={video.snippet.title}
													className='w-full h-full object-cover'
													loading='lazy'
												/>

												<div
													className='absolute inset-0 pointer-events-none
         flex items-center justify-center
         bg-black/0 group-hover:bg-black/40 transition'
												>
													<svg
														className='w-10 h-10 text-white opacity-80 group-hover:scale-110 transition'
														fill='currentColor'
														viewBox='0 0 24 24'
													>
														<path d='M8 5v14l11-7z' />
													</svg>
												</div>
											</div>

											{/* Info */}
											<div className='flex-1 min-w-0'>
												<h4 className='text-sm font-semibold text-gray-900 line-clamp-2'>
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

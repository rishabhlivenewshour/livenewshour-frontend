import { useState } from 'react';
import {
	CopyIcon,
	FacebookIcon,
	InstagramIcon,
	LinkedinIcon,
	MailIcon,
	TickIcon,
	WhatsappIcon,
	XTwitterIcon,
} from '../common/Icons';

const getShareUrls = (url, text) => ({
	facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
		url
	)}`,
	x: `https://x.com/intent/tweet?url=${encodeURIComponent(
		url
	)}&text=${encodeURIComponent(text)}`,
	linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
		url
	)}`,
	email: `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(
		url
	)}`,
	whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(
		text + ' ' + url
	)}`,
});

const ArticleShare = ({ article }) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(window.location.href);
		setCopied(true);

		setTimeout(() => {
			setCopied(false);
		}, 3000);
	};

	const shareArticle = (platform) => {
		const url = window.location.href;
		const text = article?.title || '';

		const shareUrls = getShareUrls(url, text);

		if (shareUrls[platform]) {
			window.open(shareUrls[platform], '_blank', 'width=600,height=400');
		}
	};

	const handleInstagramShare = () => {
		const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

		if (isMobile) {
			navigator.clipboard.writeText(window.location.href);
			alert('Link copied! Opening Instagram...');
			setTimeout(() => {
				window.location.href = 'instagram://app';
			}, 500);
		} else {
			alert('Instagram sharing is only available on mobile devices.');
		}
	};

	return (
		<div className='flex items-center justify-end gap-2 mb-8'>
			<button
				onClick={() => shareArticle('facebook')}
				className='h-[40px] w-[40px] flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 transition text-sm font-semibold'
			>
				<FacebookIcon size={22} className='' />
			</button>
			<button
				onClick={() => shareArticle('whatsapp')}
				className='h-[40px] w-[40px] flex items-center justify-center bg-green-700 text-white rounded-full hover:bg-green-800 transition text-sm font-semibold'
			>
				<WhatsappIcon size={22} className='' />
			</button>
			<button
				onClick={handleInstagramShare}
				className='h-[40px] w-[40px] flex items-center justify-center bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white rounded-full hover:bg-[#8C3AAA] transition text-sm font-semibold'
			>
				<InstagramIcon size={22} className='' />
			</button>
			<button
				onClick={() => shareArticle('x')}
				className='h-[40px] w-[40px] flex items-center justify-center bg-gray-800 text-white rounded-full hover:bg-gray-900 transition text-sm font-semibold'
			>
				<XTwitterIcon size={22} className='' />
			</button>
			<button
				onClick={() => shareArticle('linkedin')}
				className='h-[40px] w-[40px] flex items-center justify-center bg-blue-700 text-white rounded-full hover:bg-blue-800 transition text-sm font-semibold'
			>
				<LinkedinIcon size={22} className='' />
			</button>
			<button
				onClick={() => shareArticle('email')}
				className='h-[40px] w-[40px] flex items-center justify-center bg-red-600 text-white rounded-full hover:bg-red-700 transition text-sm font-semibold'
			>
				<MailIcon size={22} className='' />
			</button>
			<button
				onClick={handleCopy}
				className='h-[40px] w-[40px] flex items-center justify-center bg-gray-600 text-white rounded-full hover:bg-gray-700 transition text-sm font-semibold'
			>
				{copied ? (
					<TickIcon size={22} className='' />
				) : (
					<CopyIcon size={22} className='' />
				)}
			</button>
		</div>
	);
};

export default ArticleShare;

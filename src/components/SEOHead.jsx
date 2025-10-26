import { useEffect } from 'react';

const SEOHead = ({
	title,
	description = 'Get the latest breaking news, headlines, and in-depth coverage from Live News Hour – your trusted source for global, business, sports, entertainment, and tech news.',
	keywords = [
		'Live News Hour',
		'Live News',
		'News Hour',
		'LiveNewsHour',
		'LNH',
		'Breaking News',
		'Latest Headlines',
		'India News',
		'World News',
		'Sports News',
		'Entertainment News',
		'Technology Updates',
	],
	image,
	url,
	type = 'website',
	author = 'Live News Hour Team',
	publishedTime,
	modifiedTime,
	category,
	tags = [],
	noIndex = false,
}) => {
	const siteName = 'Live News Hour';
	const baseUrl = 'https://www.livenewshour.com';
	const defaultImage = `${baseUrl}/og-image.png`;

	const fullTitle = title ? `${title} | ${siteName}` : siteName;
	const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
	const ogImage = image || defaultImage;

	useEffect(() => {
		document.title = fullTitle;

		// --- Standard Meta Tags ---
		updateMetaTag('description', description);
		updateMetaTag('keywords', keywords.join(', '));
		updateMetaTag('author', author);
		updateMetaTag('language', 'en');
		updateMetaTag('revisit-after', '1 days');
		updateMetaTag(
			'robots',
			noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'
		);

		// --- Open Graph Meta Tags ---
		updateMetaTag('og:type', type, 'property');
		updateMetaTag('og:url', fullUrl, 'property');
		updateMetaTag('og:title', fullTitle, 'property');
		updateMetaTag('og:description', description, 'property');
		updateMetaTag('og:image', ogImage, 'property');
		updateMetaTag('og:site_name', siteName, 'property');
		updateMetaTag('og:locale', 'en_US', 'property');

		// --- Twitter Meta Tags ---
		updateMetaTag('twitter:card', 'summary_large_image', 'name');
		updateMetaTag('twitter:url', fullUrl, 'name');
		updateMetaTag('twitter:title', fullTitle, 'name');
		updateMetaTag('twitter:description', description, 'name');
		updateMetaTag('twitter:image', ogImage, 'name');
		updateMetaTag('twitter:site', '@livenewshour', 'name');
		updateMetaTag(
			'twitter:creator',
			author ? `@${author}` : '@livenewshour',
			'name'
		);

		// --- Canonical URL ---
		updateCanonicalUrl(fullUrl);

		// --- Article Specific ---
		if (type === 'article') {
			updateMetaTag('article:published_time', publishedTime, 'property');

			updateMetaTag(
				'article:modified_time',
				modifiedTime || publishedTime,
				'property'
			);

			updateMetaTag('article:author', author, 'property');
			updateMetaTag('article:section', category, 'property');

			if (tags && tags.length > 0) {
				tags.forEach((tag) => {
					updateMetaTag('article:tag', tag, 'property');
				});
			}
		}

		// --- Structured Data (Schema.org) ---
		if (type === 'article') {
			updateStructuredData(
				{
					'@context': 'https://schema.org',
					'@type': 'NewsArticle',
					headline: title,
					description,
					image: ogImage,
					datePublished: publishedTime,
					dateModified: modifiedTime || publishedTime,
					author: {
						'@type': 'Person',
						name: author,
					},
					publisher: {
						'@type': 'Organization',
						name: siteName,
						logo: {
							'@type': 'ImageObject',
							url: `${baseUrl}/logo.jpeg`,
						},
					},
					mainEntityOfPage: {
						'@type': 'WebPage',
						'@id': fullUrl,
					},
				},
				'article-schema'
			);
		} else {
			updateStructuredData(
				{
					'@context': 'https://schema.org',
					'@type': 'WebSite',
					name: siteName,
					url: baseUrl,
					description,
					image: ogImage,
					publisher: {
						'@type': 'Organization',
						name: siteName,
						logo: {
							'@type': 'ImageObject',
							url: `${baseUrl}/logo.jpeg`,
						},
					},
				},
				'website-schema'
			);
		}
	}, [
		title,
		description,
		keywords,
		image,
		url,
		type,
		author,
		publishedTime,
		modifiedTime,
		category,
		tags,
		noIndex,
		fullTitle,
		fullUrl,
		ogImage,
	]);

	return null;
};

// --- Helper Functions ---
function updateMetaTag(name, content, attribute = 'name') {
	if (!content) return;

	const existingTag = document.querySelector(`meta[${attribute}="${name}"]`);

	if (existingTag) existingTag.remove();

	const tag = document.createElement('meta');
	tag.setAttribute(attribute, name);
	tag.setAttribute('content', content);
	document.head.appendChild(tag);
}

function updateCanonicalUrl(url) {
	let canonical = document.querySelector('link[rel="canonical"]');
	if (!canonical) {
		canonical = document.createElement('link');
		canonical.rel = 'canonical';
		document.head.appendChild(canonical);
	}
	canonical.href = url;
}

function updateStructuredData(data, id) {
	const existingScript = document.getElementById(id);

	if (existingScript) existingScript.remove();

	const script = document.createElement('script');
	script.id = id;
	script.type = 'application/ld+json';
	script.textContent = JSON.stringify(data);
	document.head.appendChild(script);
}

export default SEOHead;

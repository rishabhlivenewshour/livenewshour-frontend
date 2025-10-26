export const processvalue = (value) => {
	if (!value) return '';
	return value
		.replace(/[&/:(,)\-\s]+/g, '-') // Replace &, /, -,:,(,) and spaces with -
		.replace(/-+/g, '-') // Collapse multiple - into one
		.replace(/^-+|-+$/g, '') // Trim leading/trailing -
		.toLowerCase();
};

export const formatDate = (dateString) => {
	if (!dateString) return '';
	return new Date(dateString).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
};

export const calculateReadTime = (content) => {
	if (!content) return 1;
	const wordsPerMinute = 200;
	const words = content.split(/\s+/).length;
	return Math.ceil(words / wordsPerMinute);
};

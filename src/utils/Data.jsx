import TourismImage from '../assets/tourismimage.jpg';
import AimedicalImage from '../assets/aimedicalimage.jpg';
import GrowthImage from '../assets/growthimage.jpg';
import CybercrimeImage from '../assets/cybercrimeimage.jpg';
import EnvironmentImage from '../assets/environmentimage.jpg';
import MedalImage from '../assets/medalimage.jpg';
export const newsCategories = [
	{
		category: 'World',
		subcategories: [
			'Africa',
			'Asia',
			'Europe',
			'Middle East',
			'North America',
			'South America',
			'Australia & Oceania',
			'Global Diplomacy',
			'United Nations / NATO / G20',
		],
	},
	{
		category: 'Politics',
		subcategories: [
			'Global Politics',
			'U.S. Politics',
			'U.K. Politics',
			'Asian Politics',
			'Elections & Campaigns',
			'Policies & Reforms',
			'Government Scandals',
			'Parliament / Congress',
		],
	},
	{
		category: 'Business / Economy',
		subcategories: [
			'World Markets',
			'Economy & Inflation',
			'Startups & Entrepreneurship',
			'Trade & Exports',
			'Banking & Finance',
			'Cryptocurrency & Web3',
			'Corporate News',
			'Oil & Energy Sector',
		],
	},
	{
		category: 'Science & Technology',
		subcategories: [
			'Tech News',
			'Artificial Intelligence',
			'Cybersecurity',
			'Space & NASA/ISRO',
			'Consumer Tech & Gadgets',
			'Scientific Research',
			'Climate Tech',
		],
	},
	{
		category: 'Health',
		subcategories: [
			'COVID-19 / Epidemics',
			'Mental Health',
			'Medical Breakthroughs',
			'WHO & Global Health Policy',
			'Healthcare Systems',
			'Nutrition & Wellness',
		],
	},
	{
		category: 'Entertainment / Culture',
		subcategories: [
			'Movies (Hollywood, Bollywood, World Cinema)',
			'Celebrities & Influencers',
			'Music',
			'Fashion & Lifestyle',
			'Art & Literature',
			'Cultural Festivals',
			'TV & OTT Series',
		],
	},
	{
		category: 'Sports',
		subcategories: [
			'Football (FIFA, UEFA, EPL, La Liga)',
			'Cricket (ICC, T20, Test)',
			'Olympics',
			'NBA / Basketball',
			'Tennis',
			'Formula 1',
			'eSports',
			'Others',
		],
	},
	{
		category: 'Environment & Climate',
		subcategories: [
			'Climate Change',
			'Natural Disasters',
			'Conservation',
			'Renewable Energy',
			'Global Warming Reports',
			'UN Climate Summits',
		],
	},
	{
		category: 'Investigations / In-Depth',
		subcategories: [
			'Human Rights',
			'Conflict Zones',
			'Global Inequality',
			'Corruption & Scandals',
			'Deep Dives',
		],
	},
	{
		category: 'Regions',
		subcategories: [
			'Africa',
			'Americas',
			'Asia-Pacific',
			'Europe',
			'Middle East',
			'South Asia',
			'China',
			'India',
			'United States',
		],
	},
	{
		category: 'Education',
		subcategories: [
			'Study Abroad',
			'Scholarships',
			'International Rankings',
			'EdTech',
			'Exams & Curriculum',
		],
	},
	{
		category: 'Law & Justice',
		subcategories: [
			'International Law (ICC, UNHRC)',
			'Supreme Courts / Legal Decisions',
			'Crime & Justice',
			'Human Rights',
		],
	},
	{
		category: 'Breaking / Live',
		subcategories: ['Breaking News', 'Live Blogs', 'Live Video', 'News Briefs'],
	},
];

export const newsArticles = [
	{
		id: '001',
		title: 'AI Breakthrough in Medical Diagnostics Announced',
		description:
			'New AI model can detect early-stage cancer with 95% accuracy, revolutionizing healthcare.',
		dateTime: '2025-07-12T09:00:00Z',
		author: 'Dr. Nikhil Rao',
		image: AimedicalImage,
		category: 'Technology',
	},
	{
		id: '002',
		title: 'Cyberattack Hits Major European Airport',
		description:
			'A sophisticated cyberattack caused system outages, delaying flights across Europe.',
		dateTime: '2025-07-14T22:15:00Z',
		author: 'David Kim',
		image: CybercrimeImage,
		category: 'Security',
	},
	{
		id: '003',
		title: 'UN Climate Summit: Nations Set New Carbon Goals',
		description:
			'Over 80 countries pledged to cut emissions by 50% before 2035 in a historic agreement.',
		dateTime: '2025-07-14T18:45:00Z',
		author: 'Fatima El-Sayed',
		image: EnvironmentImage,
		category: 'Environment',
	},
	{
		id: '004',
		title: 'SpaceX Launches First Civilian Mission to Mars Orbit',
		description:
			'The groundbreaking mission is a step forward in interplanetary tourism and research.',
		dateTime: '2025-07-13T14:10:00Z',
		author: 'Liam Chen',
		image: TourismImage,
		category: 'Science',
	},
	{
		id: '005',
		title: 'Olympic Games 2025: USA Tops Medal Count',
		description:
			'With 42 gold medals, Team USA dominates the Summer Olympics medal table.',
		dateTime: '2025-07-12T20:00:00Z',
		author: 'Sophie Anders',
		image: MedalImage,
		category: 'Sports',
	},
	{
		id: '006',
		title: 'Global Markets Surge as Tech Stocks Rally',
		description:
			'Major tech companies see record gains, boosting global indices amid investor optimism.',
		dateTime: '2025-07-15T08:30:00Z',
		author: 'Jane Mitchell',
		image: GrowthImage,
		category: 'Business',
	},
];

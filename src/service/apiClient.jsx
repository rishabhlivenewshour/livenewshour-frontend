import { apiCache } from '../utils/apiCache';

export const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const apiClient = async (endpoint, options = {}) => {
	// Generate cache key
	const cacheKey = apiCache.generateKey(endpoint, options);

	// Check cache for GET requests only
	if (!options.method || options.method === 'GET') {
		const cachedData = apiCache.get(cacheKey);
		if (cachedData !== null) {
			return cachedData;
		}
	}

	const headers = {
		'Content-Type': 'application/json',
		...options.headers,
	};

	try {
		const response = await fetch(`${API_BASE_URL}${endpoint}`, {
			...options,
			headers,
		});

		if (!response.ok) {
			throw new Error(`API Error: ${response.status} - ${response.statusText}`);
		}

		const data = await response.json();

		// Cache GET responses
		if (!options.method || options.method === 'GET') {
			apiCache.set(cacheKey, data);
			console.log('💾 Cached:', endpoint);
		}

		return data;
	} catch (error) {
		console.error('API Error:', error);
		throw error;
	}
};

export const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const apiClient = async (endpoint, options = {}) => {
	const headers = {
		'Content-Type': 'application/json',
		...options.headers,
	};

	const response = await fetch(`${API_BASE_URL}${endpoint}`, {
		...options,
		headers,
	});

	if (!response.ok) {
		throw new Error(`API Error: ${response.status}`);
	}

	return response.json();
};

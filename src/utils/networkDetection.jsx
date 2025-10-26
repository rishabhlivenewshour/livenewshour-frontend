// Detect network speed and adjust page size accordingly
export const getNetworkSpeed = () => {
	const connection =
		navigator.connection ||
		navigator.mozConnection ||
		navigator.webkitConnection;

	if (!connection) {
		return 'unknown';
	}

	return connection.effectiveType || 'unknown';
};

// Get optimal page size based on network speed
export const getOptimalPageSize = () => {
	const speed = getNetworkSpeed();

	const pageSizes = {
		'4g': 20, // Fast connection - load more
		'3g': 15, // Moderate connection
		'2g': 10, // Slow connection
		'slow-2g': 5, // Very slow connection
		unknown: 20, // Default
	};

	return pageSizes[speed] || 20;
};

// Check if user is on slow connection
export const isSlowConnection = () => {
	const speed = getNetworkSpeed();
	return speed === '2g' || speed === 'slow-2g';
};

// Check if user has data saver enabled
export const isDataSaverEnabled = () => {
	const connection =
		navigator.connection ||
		navigator.mozConnection ||
		navigator.webkitConnection;

	return connection?.saveData || false;
};

// Get optimal image quality based on network
export const getOptimalImageQuality = () => {
	const speed = getNetworkSpeed();
	const dataSaver = isDataSaverEnabled();

	if (dataSaver) return 'low';

	const qualityMap = {
		'4g': 'high',
		'3g': 'medium',
		'2g': 'low',
		'slow-2g': 'low',
		unknown: 'medium',
	};

	return qualityMap[speed] || 'medium';
};

// Listen to network changes
export const onNetworkChange = (callback) => {
	const connection =
		navigator.connection ||
		navigator.mozConnection ||
		navigator.webkitConnection;

	if (!connection) return () => {};

	const handler = () => {
		callback({
			type: connection.effectiveType,
			downlink: connection.downlink,
			rtt: connection.rtt,
			saveData: connection.saveData,
		});
	};

	connection.addEventListener('change', handler);

	return () => {
		connection.removeEventListener('change', handler);
	};
};

// Get network information
export const getNetworkInfo = () => {
	const connection =
		navigator.connection ||
		navigator.mozConnection ||
		navigator.webkitConnection;

	if (!connection) {
		return {
			type: 'unknown',
			effectiveType: 'unknown',
			downlink: null,
			rtt: null,
			saveData: false,
		};
	}

	return {
		type: connection.type || 'unknown',
		effectiveType: connection.effectiveType || 'unknown',
		downlink: connection.downlink || null,
		rtt: connection.rtt || null,
		saveData: connection.saveData || false,
	};
};

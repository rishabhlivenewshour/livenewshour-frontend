const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

class APICache {
	constructor() {
		this.cache = new Map();
		this.timestamps = new Map();
	}

	// Generate cache key from endpoint and options
	generateKey(endpoint, options = {}) {
		const sortedOptions = JSON.stringify(options, Object.keys(options).sort());
		return `${endpoint}::${sortedOptions}`;
	}

	// Set cache with timestamp
	set(key, value) {
		this.cache.set(key, value);
		this.timestamps.set(key, Date.now());
	}

	// Get cache if not expired
	get(key) {
		if (!this.cache.has(key)) {
			return null;
		}

		const timestamp = this.timestamps.get(key);
		const isExpired = Date.now() - timestamp > CACHE_DURATION;

		if (isExpired) {
			this.cache.delete(key);
			this.timestamps.delete(key);
			return null;
		}

		return this.cache.get(key);
	}

	// Check if key exists and is valid
	has(key) {
		return this.get(key) !== null;
	}

	// Clear specific cache entry
	delete(key) {
		this.cache.delete(key);
		this.timestamps.delete(key);
	}

	// Clear all cache
	clear() {
		this.cache.clear();
		this.timestamps.clear();
	}

	// Get cache size
	size() {
		return this.cache.size;
	}

	// Clear expired entries
	clearExpired() {
		const now = Date.now();
		for (const [key, timestamp] of this.timestamps.entries()) {
			if (now - timestamp > CACHE_DURATION) {
				this.cache.delete(key);
				this.timestamps.delete(key);
			}
		}
	}
}

export const apiCache = new APICache();

// Clear expired cache every minute
setInterval(() => {
	apiCache.clearExpired();
}, 60 * 1000);

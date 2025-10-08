class RateLimiter {
	constructor(maxRequests = 20, timeWindow = 60000) {
		this.maxRequests = maxRequests; // Max requests allowed
		this.timeWindow = timeWindow; // Time window in milliseconds
		this.requests = []; // Store request timestamps
	}

	// Check if request can be made
	canMakeRequest() {
		const now = Date.now();

		// Remove old requests outside the time window
		this.requests = this.requests.filter(
			(timestamp) => now - timestamp < this.timeWindow
		);

		// Check if we've exceeded the limit
		if (this.requests.length >= this.maxRequests) {
			const oldestRequest = this.requests[0];
			const timeUntilReset = this.timeWindow - (now - oldestRequest);
			console.warn(
				`⚠️ Rate limit exceeded. Try again in ${Math.ceil(
					timeUntilReset / 1000
				)} seconds`
			);
			return false;
		}

		// Add current request timestamp
		this.requests.push(now);
		return true;
	}

	// Get remaining requests
	getRemainingRequests() {
		const now = Date.now();
		this.requests = this.requests.filter(
			(timestamp) => now - timestamp < this.timeWindow
		);
		return Math.max(0, this.maxRequests - this.requests.length);
	}

	// Get time until reset
	getTimeUntilReset() {
		if (this.requests.length === 0) return 0;
		const now = Date.now();
		const oldestRequest = this.requests[0];
		return Math.max(0, this.timeWindow - (now - oldestRequest));
	}

	// Reset the rate limiter
	reset() {
		this.requests = [];
	}
}

// Create rate limiter instance: 30 requests per minute
export const apiRateLimiter = new RateLimiter(30, 60000);

// Create search rate limiter: 10 searches per minute
export const searchRateLimiter = new RateLimiter(10, 60000);

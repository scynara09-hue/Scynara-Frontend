/**
 * Rate limiter for Nominatim API calls
 * Nominatim has a limit of 1 request per second
 * This implements a simple queue-based limiter
 */

class NominatimRateLimiter {
  constructor(requestsPerSecond = 1) {
    this.requestsPerSecond = requestsPerSecond;
    this.minInterval = 1000 / requestsPerSecond;
    this.lastRequestTime = 0;
    this.queue = [];
    this.isProcessing = false;
  }

  async request(fetchFn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ fetchFn, resolve, reject });
      this.processQueue();
    });
  }

  async processQueue() {
    if (this.isProcessing || this.queue.length === 0) {
      return;
    }

    this.isProcessing = true;

    while (this.queue.length > 0) {
      const now = Date.now();
      const timeSinceLastRequest = now - this.lastRequestTime;

      if (timeSinceLastRequest < this.minInterval) {
        // Wait before processing next request
        await new Promise(resolve =>
          setTimeout(resolve, this.minInterval - timeSinceLastRequest)
        );
      }

      const { fetchFn, resolve, reject } = this.queue.shift();

      try {
        const result = await fetchFn();
        this.lastRequestTime = Date.now();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    }

    this.isProcessing = false;
  }
}

// Create a singleton instance
export const nominatimLimiter = new NominatimRateLimiter(0.5); // 1 request per 2 seconds

/**
 * Fetch address from coordinates using Nominatim with rate limiting
 */
export const fetchAddressFromCoordinates = async (lat, lng) => {
  return nominatimLimiter.request(async () => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
      {
        headers: {
          'User-Agent': 'Scynara-App' // Nominatim requires User-Agent header
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Nominatim API error: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.display_name) {
      return data.display_name;
    }

    throw new Error('No address found for coordinates');
  });
};

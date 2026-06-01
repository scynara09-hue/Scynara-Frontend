/**
 * Sanitize user input to prevent XSS attacks
 * Removes potentially dangerous HTML/JS characters
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/[<>\"']/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
};

/**
 * Sanitize email address
 */
export const sanitizeEmail = (email) => {
  const sanitized = sanitizeInput(email);
  return sanitized.toLowerCase();
};

/**
 * Sanitize phone number - remove non-digits except certain formatting chars
 */
export const sanitizePhoneNumber = (phone) => {
  if (typeof phone !== 'string') return phone;
  return phone.replace(/[^\d\-\+\s()]/g, '');
};

/**
 * Sanitize address input
 */
export const sanitizeAddress = (address) => {
  const sanitized = sanitizeInput(address);
  // Remove extra spaces
  return sanitized.replace(/\s+/g, ' ').trim();
};

/**
 * Validate and sanitize coordinates
 */
export const sanitizeCoordinates = (lat, lng) => {
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lng);
  
  if (isNaN(latitude) || isNaN(longitude)) {
    throw new Error('Invalid coordinates');
  }
  
  if (latitude < -90 || latitude > 90) {
    throw new Error('Invalid latitude');
  }
  
  if (longitude < -180 || longitude > 180) {
    throw new Error('Invalid longitude');
  }
  
  return { latitude, longitude };
};

const TOKEN_KEY = 'token';
const MAX_TOKEN_AGE = 1 * 60 * 60 * 1000;

export const setToken = (token) => {
  if (!token || typeof token !== 'string') {
    throw new Error('Token inválido');
  }
  const timestamp = Date.now();
  localStorage.setItem(TOKEN_KEY, JSON.stringify({ token, timestamp }));
};

export const getToken = () => {
  try {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (!stored) return null;
    
    const { token, timestamp } = JSON.parse(stored);
    const age = Date.now() - timestamp;
    
    if (age > MAX_TOKEN_AGE) {
      localStorage.removeItem(TOKEN_KEY);
      return null;
    }
    
    return token;
  } catch (error) {
    console.error('Error reading token:', error);
    localStorage.removeItem(TOKEN_KEY);
    return null;
  }
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
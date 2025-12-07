// Prefer environment-configured base URL; fallback to localhost
const API_BASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL)
    ? `${import.meta.env.VITE_API_BASE_URL}`
    : 'http://localhost:5000/api';

export const fetchSales = async (search = '', page = 1, limit = 10) => {
  console.log('Fetching sales with search:', search, 'page:', page, 'limit:', limit);
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString()
  });
  if (search) {
    params.append('search', search);
  }
  const url = `${API_BASE_URL}/sales?${params}`;
  console.log('API URL:', url);
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json'
      }
    });
    console.log('Response status:', response.status);
    if (!response.ok) {
      console.error('Response not ok:', response.statusText);
      throw new Error('Failed to fetch sales');
    }
    const data = await response.json();
    console.log('Fetched data:', data);
    return data;
  } catch (error) {
    // Enhance network error visibility
    if (error instanceof TypeError) {
      console.error('Network/Fetch error. Is backend running at', API_BASE_URL, '?', error);
    } else {
      console.error('Error fetching sales:', error);
    }
    throw error;
  }
};
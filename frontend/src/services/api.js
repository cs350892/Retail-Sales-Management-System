const API_BASE_URL = 'http://localhost:5000/api';

export const fetchSales = async (search = '', page = 1, limit = 10) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString()
  });
  if (search) {
    params.append('search', search);
  }
  const response = await fetch(`${API_BASE_URL}/sales?${params}`);
  if (!response.ok) {
    throw new Error('Failed to fetch sales');
  }
  return response.json();
};
// Prefer environment-configured base URL; fallback to localhost
const API_BASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL)
    ? `${import.meta.env.VITE_API_BASE_URL}`
    : 'http://localhost:5000/api';

export const fetchSales = async (filters = {}) => {
  const {
    search = '',
    page = 1,
    limit = 10,
    regions = [],
    genders = [],
    categories = [],
    tags = [],
    payments = [],
    ageMin = '',
    ageMax = '',
    dateFrom = '',
    dateTo = '',
    sort = 'date-desc'
  } = filters

  const params = new URLSearchParams()
  params.set('page', String(page))
  params.set('limit', String(limit))
  if (search) params.set('search', search)
  if (regions.length) params.set('regions', regions.join(','))
  if (genders.length) params.set('genders', genders.join(','))
  if (categories.length) params.set('categories', categories.join(','))
  if (tags.length) params.set('tags', tags.join(','))
  if (payments.length) params.set('payments', payments.join(','))
  if (ageMin !== '') params.set('ageMin', String(ageMin))
  if (ageMax !== '') params.set('ageMax', String(ageMax))
  if (dateFrom) params.set('dateFrom', dateFrom)
  if (dateTo) params.set('dateTo', dateTo)
  if (sort) params.set('sort', sort)

  const url = `${API_BASE_URL}/sales?${params.toString()}`;
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
/**
 * API Service — PokeAPI
 * Base URL: https://pokeapi.co/api/v2
 * Cache strategy: simple in-memory Map keyed by URL.
 * Survives the session, cleared on page refresh.
 */


//API URL from .env
const API_URL = import.meta.env.VITE_API_URL;

const cache = new Map();
async function cachedFecth(url = "") {
  if (cache.has(url)) return cache.get(url);

  const response = await fetch(url);
  if(!response.ok) throw new Error(`Data fecth failed!!! : ${response.status} ${response.statusText}` );

  const data = await response.json();
  cache.set(url, data);
  return data;
}


/**
 * Fetch a paginated list of Pokemon.
 * @param {number} offset - How many items to skip (for pagination)
 * @param {number} limit  - How many items per page
 */
export async function fetchItems({ offset = 0, limit = 20 }) {
  const URL = `${API_URL}/pokemon?offset=${offset}&limit=${limit}`;
  return cachedFecth(URL);
}


/**
 * Fetch a single item's details by ID.
 * @param {string|number} id - The item identifier
 */
export async function fetchItemById(id) {
  const URL = `${API_URL}/pokemon/${id}`;
  return cachedFecth(URL);
}


// Fecthing all names for search
export async function fetchAllNames() {
  const URL = `${API_URL}/pokemon?offset=0&limit=1400`;
  return cachedFecth(URL);
}

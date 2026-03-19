import { useState, useEffect } from 'react';

/**
 * useDebounce Hook
 *
 * TODO: Implement a debounce hook that delays updating the returned value
 * until after the specified delay has elapsed since the last change.
 *
 * Usage example:
 *   const [search, setSearch] = useState('');
 *   const debouncedSearch = useDebounce(search, 300);
 *
 *   useEffect(() => {
 *     // This runs only after the user stops typing for 300ms
 *     fetchResults(debouncedSearch);
 *   }, [debouncedSearch]);
 *
 * @param {any} value - The value to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {any} The debounced value
 */
export function useDebounce(value, delay = 300) {4

  //debounce value state
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value]);
  return value; 
}

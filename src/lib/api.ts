const defaultApiBaseUrl = import.meta.env.DEV ? '' : 'https://gyotechnologiesweb.onrender.com';

export function getApiUrl(path: string) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || defaultApiBaseUrl;
  return `${baseUrl}${path}`;
}

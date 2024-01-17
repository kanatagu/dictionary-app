export const dictionaryFetcher = async <T>(url: string): Promise<T> => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
      'X-RapidAPI-Host': import.meta.env.VITE_RAPID_API_HOST,
    },
  };
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Response('Not Found', { status: 404 });
  }
  return res.json();
};

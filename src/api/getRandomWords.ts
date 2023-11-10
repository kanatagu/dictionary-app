export const getRandomWords = async () => {
  const url = 'https://urban-dictionary7.p.rapidapi.com/v0/random';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
      'X-RapidAPI-Host': import.meta.env.VITE_RAPID_API_HOST,
    },
  };

  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw Error('Not Found');
    }

    const result = await res.json();

    return result;
  } catch (e) {
    console.error(e);
    throw new Response('', {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
};

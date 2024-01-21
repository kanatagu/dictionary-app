import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_RAPID_DICTIONARY_URL,
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
    'X-RapidAPI-Host': import.meta.env.VITE_RAPID_API_HOST,
  },
});

export default instance;

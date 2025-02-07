import { useState, useEffect } from 'react';

const PIXABAY_API_KEY = '48594931-2850c018a716eeb5b45629510'; // Replace with your API key
const PIXABAY_API_URL = 'https://pixabay.com/api/';

export const usePixabayImages = () => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRandomImage = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${PIXABAY_API_URL}?key=${PIXABAY_API_KEY}&q=statue&per_page=200`
      );
      const data = await response.json();
      const randomImage = data.hits[Math.floor(Math.random() * data.hits.length)];
      setImage(randomImage.largeImageURL);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomImage();
  }, []);

  return { image, isLoading, error, fetchRandomImage };
};
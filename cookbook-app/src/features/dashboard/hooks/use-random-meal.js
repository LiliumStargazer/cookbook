import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { getRandomMeal } from '@/shared/services/get-random-meal.js';

export function useRandomMeal() {
  const [loading, setLoading] = useState(false);
  const [randomMeal, setRandomMeal] = useState(null);

  const fetchRandomMeal = async () => {
    setLoading(true);
    try {
      const response = await getRandomMeal();
      if (response.success) {
        setRandomMeal(response.data.meals?.[0] || null);
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      toast.error(error || 'Errore durante il recupero del conteggio utenti');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchRandomMeal();
    })();
  }, []);

  return { loadingRandomMeal: loading, randomMeal };
}

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { lookupMealById } from '@/shared/services/lookup-meal-by-id.js';

export function useMealDetail(idMeal) {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMealDetail = async () => {
      if (!idMeal) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const result = await lookupMealById(idMeal);

        if (result.success && result.data.meals && result.data.meals[0]) {
          setMeal(result.data.meals[0]);
        } else {
          console.log('sono in errore', result);
          toast.error(result.message || 'Ricetta non trovata');
        }
      } catch (error) {
        toast.error(error.message || 'Errore nel caricamento della ricetta');
        console.error('Errore nel caricamento della ricetta:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMealDetail();
  }, [idMeal]);

  return {
    meal,
    loading,
  };
}

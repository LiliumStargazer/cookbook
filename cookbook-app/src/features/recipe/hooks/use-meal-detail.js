import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { lookupMealById } from '@/shared/services/lookup-meal-by-id.js';

export function useMealDetail(idMeal) {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMealDetail = useCallback(async () => {
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
        toast.error(result.message || 'Ricetta non trovata');
      }
    } catch (error) {
      toast.error(error.message || 'Errore nel caricamento della ricetta');
    } finally {
      setLoading(false);
    }
  }, [idMeal]);

  useEffect(() => {
    fetchMealDetail().catch(() => {});
  }, [fetchMealDetail]);

  return {
    meal,
    loading,
    fetchMealDetail, // ora puoi richiamarla anche da fuori
  };
}

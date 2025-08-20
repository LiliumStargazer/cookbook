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
      const response = await lookupMealById(idMeal);

      if (response.success && response.data.meals && response.data.meals[0]) {
        setMeal(response.data.meals[0]);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
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
    fetchMealDetail, // now you can call it from outside
  };
}

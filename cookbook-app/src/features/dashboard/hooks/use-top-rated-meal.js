import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { lookupMealById } from '@/shared/services/lookup-meal-by-id.js';
import { getTopRatedMeal } from '@/features/dashboard/services/api-dashboard.js';

export function useTopRatedMeals() {
  const [loading, setLoading] = useState(false);
  const [topRatedMeal, setTopRatedMeal] = useState(null);

  const fetchTopRatedMeal = async () => {
    setLoading(true);
    try {
      let response = await getTopRatedMeal();
      console.log(response);
      if (response.success) {
        response = await lookupMealById(response.data._id);
        if (response.success) {
          setTopRatedMeal(response.data.meals?.[0] || null);
        } else {
          toast.error(response.message);
        }
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchTopRatedMeal();
    })();
  }, []);

  return { loadingTopRated: loading, topRatedMeal };
}

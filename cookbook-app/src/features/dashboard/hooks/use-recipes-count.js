import { useState, useEffect } from 'react';
import { getMealsCount } from '@/features/dashboard/services/api-dashboard.js';
import { toast } from 'sonner';

export function useRecipesCount() {
  const [loading, setLoading] = useState(false);
  const [recipesCount, setRecipesCount] = useState(null);
  const [error, setError] = useState(null);

  const fetchRecipesCount = async () => {
    setLoading(true);
    try {
      const response = await getMealsCount();
      if (response.success) {
        setRecipesCount(response.data.count);
      } else {
        setError(true);
        toast.error(response.error);
      }
    } catch (error) {
      setError(true);
      toast.error(error || 'Errore durante il recupero del conteggio ricette');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchRecipesCount();
    })();
  }, []);

  return { loadingRecipes: loading, recipesCount, errorRecipes: error };
}

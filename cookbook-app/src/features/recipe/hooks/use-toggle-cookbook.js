import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { addToCookBook, removeFromCookbook } from '@/features/recipe/services/api-recipes.js';
import { useCookbook } from '@/features/cookbook/hooks/use-cookbook.js';

export function useToggleCookbook(meal) {
  const [loading, setLoading] = useState(false);
  const { isInCookbook, refetch } = useCookbook();
  const isInUserCookbook = isInCookbook(meal.idMeal);

  const toggleCookbook = useCallback(async () => {
    try {
      setLoading(true);
      let result;
      if (isInUserCookbook) {
        result = await removeFromCookbook(meal.idMeal);
      } else {
        result = await addToCookBook(meal);
      }

      if (result.success) {
        await refetch();
        toast.success(
          isInUserCookbook ? 'Ricetta rimossa dal ricettario' : 'Ricetta aggiunta al ricettario',
        );
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error(error.message || 'Errore nella gestione della ricetta');
    } finally {
      setLoading(false);
    }
  }, [isInUserCookbook, meal, refetch]);

  return {
    loading,
    isInUserCookbook,
    toggleCookbook,
  };
}

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
      let response;
      if (isInUserCookbook) {
        response = await removeFromCookbook(meal.idMeal);
      } else {
        response = await addToCookBook(meal);
      }

      if (response.success) {
        await refetch();
        toast.success(
          isInUserCookbook ? 'Recipe removed from cookbook' : 'Recipe added to cookbook',
        );
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
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

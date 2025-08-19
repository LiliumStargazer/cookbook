import { useState, useCallback } from 'react';
import { addReview } from '@/features/reviews/services/api-reviews.js';
import { toast } from 'sonner';

export default function useAddReview(idMeal) {
  const [loading, setLoading] = useState(false);

  const submitReview = useCallback(
    async ({ comment, rating, difficulty, preparationDate }) => {
      try {
        setLoading(true);
        const response = await addReview({ idMeal, rating, preparationDate, difficulty, comment });
        if (!response.success) toast.error(response.error || 'Error submitting review');
      } catch (err) {
        toast.error(err.message || 'Error submitting review');
      } finally {
        setLoading(false);
      }
    },
    [idMeal],
  );

  return { submitReview, loading };
}

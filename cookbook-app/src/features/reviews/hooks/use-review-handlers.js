import { useCallback } from 'react';
import { deleteReview } from '@/features/reviews/services/api-reviews.js';
import { toast } from 'sonner';

export default function useReviewHandlers({ submitReview, refetch }) {
  const handleSubmit = useCallback(
    async data => {
      await submitReview(data);
      refetch();
    },
    [submitReview, refetch],
  );

  const handleDeleteReview = useCallback(
    async id => {
      try {
        const result = await deleteReview(id);
        if (result.success) {
          toast.success('recensione eliminata con successo');
          refetch();
        } else {
          toast.error(result.error || "Errore durante l'eliminazione della recensione");
        }
      } catch (err) {
        console.error('Error deleting review:', err);
      }
    },
    [refetch],
  );

  return { handleSubmit, handleDeleteReview };
}

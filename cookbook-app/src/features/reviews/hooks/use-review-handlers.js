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
        const response = await deleteReview(id);
        if (response.success) {
          toast.success('Review deleted successfully');
          refetch();
        } else {
          toast.error(response.error || 'Error deleting review');
        }
      } catch (error) {
        console.error(error.message);
      }
    },
    [refetch],
  );

  return { handleSubmit, handleDeleteReview };
}

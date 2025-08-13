import { useState } from 'react';
import { addReview } from '@/features/reviews/services/api-reviews.js';
import { toast } from 'sonner';

export default function useAddReview(recipeId) {
  const [loading, setLoading] = useState(false);

  const submitReview = async ({ comment, rating }) => {
    try {
      setLoading(true);
      const response = await addReview({ recipeId, comment, rating });
      console.log(response);
      if (response.success) {
        window.location.reload();
      } else {
        toast.error(response.message || "Errore nell'invio della recensione");
      }
    } catch (err) {
      toast.error(err.message || "Errore nell'invio della recensione");
    } finally {
      setLoading(false);
    }
  };

  return { submitReview, loading };
}

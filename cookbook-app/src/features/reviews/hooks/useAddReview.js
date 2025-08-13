import { useState } from 'react';
import { addReview } from '@/features/reviews/services/api-reviews.js';
import { toast } from 'sonner';

export default function useAddReview(idRecipe) {
  const [loading, setLoading] = useState(false);

  const submitReview = async ({ rating, preparationDate, difficulty, comment }) => {
    try {
      setLoading(true);
      const response = await addReview({ idRecipe, rating, preparationDate, difficulty, comment });
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

import { useEffect, useState } from 'react';
import { getReviews } from '@/features/reviews/services/api-reviews.js';
import { toast } from 'sonner';

export default function useReviews(recipeId) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await getReviews(recipeId);
        if (response.success) {
          setReviews(response.data);
        } else {
          toast.error(response.message);
        }
      } catch (err) {
        console.error('Errore nel caricamento delle recensioni:', err);
        toast.error(err.message || 'Errore nel caricamento delle recensioni');
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [recipeId]);

  return { reviews, loading };
}

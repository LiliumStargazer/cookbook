import { useEffect, useState, useCallback } from 'react';
import { getReviews } from '@/features/reviews/services/api-reviews.js';
import { toast } from 'sonner';

export default function useReviews(idMeal) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getReviews(idMeal);
      if (response.success) {
        setReviews(response.data);
      } else {
        toast.error(response.error || 'Error loading reviews');
      }
    } catch (err) {
      toast.error(err.message || 'Error loading reviews');
    } finally {
      setLoading(false);
    }
  }, [idMeal]);

  useEffect(() => {
    fetchReviews().catch(error => {
      console.error(error);
    });
  }, [fetchReviews]);

  return { reviews, loading, refetch: fetchReviews };
}

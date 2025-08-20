import { useState, useEffect } from 'react';
import { getReviewsCount } from '@/features/dashboard/services/api-dashboard.js';
import { toast } from 'sonner';

export function useReviewsCount() {
  const [loading, setLoading] = useState(false);
  const [reviewsCount, setReviewsCount] = useState(null);
  const [error, setError] = useState(null);

  const fetchReviewsCount = async () => {
    setLoading(true);
    try {
      const response = await getReviewsCount();
      if (response.success) {
        setReviewsCount(response.data.count);
      } else {
        setError(true);
        toast.error(response.message);
      }
    } catch (error) {
      setError(true);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchReviewsCount();
    })();
  }, []);

  return { loadingReviews: loading, reviewsCount, errorReviews: error };
}

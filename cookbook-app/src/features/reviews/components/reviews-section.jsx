import { useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import ReviewList from './review-list.jsx';
import ReviewForm from './review-form.jsx';
import useReviews from '../hooks/useReviews.js';
import useAddReview from '../hooks/useAddReview.js';

export default function ReviewsSection({ recipeId }) {
  const { reviews, loading } = useReviews(recipeId);
  const { submitReview, loading: sending } = useAddReview(recipeId);

  const handleSubmit = useCallback(data => submitReview(data), [submitReview]);

  return (
    <Card className='mt-8'>
      <CardHeader>
        <CardTitle>Recensioni</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className='text-muted-foreground'>Caricamento recensioni...</p>
        ) : (
          <ReviewList reviews={reviews} />
        )}
        <div className='mt-6'>
          <ReviewForm onSubmit={handleSubmit} isLoading={sending} />
        </div>
      </CardContent>
    </Card>
  );
}

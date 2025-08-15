import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import ReviewList from './review-list.jsx';
import ReviewForm from './review-form.jsx';
import useReviews from '../hooks/use-reviews.js';
import useAddReview from '../hooks/use-add-review.js';
import useReviewHandlers from '../hooks/use-review-handlers.js';
import useAuth from '@/lib/store.js';

export default function ReviewsSection({ idMeal }) {
  const { reviews, loading, refetch } = useReviews(idMeal);
  const { submitReview, loading: sending } = useAddReview(idMeal);
  const { handleSubmit, handleDeleteReview } = useReviewHandlers({ submitReview, refetch });
  const { userData } = useAuth();

  return (
    <Card className='mt-8'>
      <CardHeader>
        <CardTitle>Recensioni</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className='text-muted-foreground'>Caricamento recensioni...</p>
        ) : (
          <ReviewList reviews={reviews} userId={userData._id} onClickDelete={handleDeleteReview} />
        )}
        <div className='mt-6'>
          <ReviewForm onSubmit={handleSubmit} isLoading={sending} />
        </div>
      </CardContent>
    </Card>
  );
}

import ReviewCard from './review-card.jsx';

export default function ReviewList({ reviews }) {
  if (!reviews.data || reviews.data.length === 0) {
    return <p className='text-muted-foreground'>Nessuna recensione disponibile.</p>;
  }

  return (
    <div className='space-y-4'>
      {reviews.map(review => (
        <ReviewCard key={review._id || review.data.id} review={review} />
      ))}
    </div>
  );
}

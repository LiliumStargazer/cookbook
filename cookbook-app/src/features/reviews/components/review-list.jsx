import ReviewCard from './review-card.jsx';

export default function ReviewList({ reviews, userId, onClickDelete }) {
  if (!reviews || reviews.length === 0) {
    return <p className='text-muted-foreground'>Nessuna recensione disponibile.</p>;
  }

  return (
    <div className='space-y-4'>
      {reviews.map(review => (
        <ReviewCard
          key={review._id}
          review={review}
          userId={userId}
          onClickDelete={onClickDelete}
        />
      ))}
    </div>
  );
}

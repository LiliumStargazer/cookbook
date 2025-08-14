import { Card, CardContent } from '@/components/ui/card.jsx';
import { Star } from 'lucide-react';

export default function ReviewCard({ review }) {
  console.log(review);
  return (
    <Card className='border p-3'>
      <CardContent className='flex flex-col gap-2'>
        <div className='flex items-center gap-2'>
          <span className='font-semibold'>{review.username || 'Anonimo'}</span>
          <span className='ml-2 text-xs text-gray-500'>Rating</span>
          <span className='flex items-center text-yellow-500'>
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} className='w-4 h-4 fill-yellow-400' />
            ))}
          </span>
          <span className='ml-2 text-xs text-gray-500'>Difficulty</span>
          <span className='flex items-center text-yellow-500'>
            {[...Array(review.difficulty)].map((_, i) => (
              <Star key={i} className='w-4 h-4 fill-yellow-400' />
            ))}
          </span>
          <span className='ml-2 text-xs text-gray-500'>Preparation Date</span>
          <span className='flex items-center text-gray-500 !text-xs'>
            {new Date(review.preparationDate).toLocaleDateString()}
          </span>
          <span className='text-xs text-gray-400 ml-auto'>
            {new Date(review.createdAt).toLocaleDateString()}
          </span>
        </div>
        <p className='text-sm text-gray-700'>{review.comment}</p>
      </CardContent>
    </Card>
  );
}

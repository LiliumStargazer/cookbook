import { Card, CardContent } from '@/components/ui/card.jsx';
import { Star } from 'lucide-react';

export default function ReviewCard({ review }) {
  return (
    <Card className='border p-3'>
      <CardContent className='flex flex-col gap-2'>
        <div className='flex items-center gap-2'>
          <span className='font-semibold'>{review.user?.name || 'Anonimo'}</span>
          <span className='flex items-center text-yellow-500'>
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} className='w-4 h-4 fill-yellow-400' />
            ))}
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

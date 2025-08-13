import { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Star, SendHorizontal } from 'lucide-react';

export default function ReviewForm({ onSubmit, isLoading }) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  return (
    <form
      className='space-y-3'
      onSubmit={e => {
        e.preventDefault();
        if (rating > 0 && comment.trim()) {
          onSubmit({ comment, rating });
        }
      }}
    >
      <div className='flex gap-1 items-center'>
        {[1, 2, 3, 4, 5].map(star => (
          <button
            type='button'
            key={star}
            onClick={() => setRating(star)}
            className={star <= rating ? 'text-red-500' : 'text-gray-300'}
            aria-label={`Valuta ${star} stelle`}
          >
            <Star className='w-5 h-5' />
          </button>
        ))}
        <span className='ml-2 text-sm text-gray-500'>{rating > 0 ? `${rating}/5` : 'Valuta'}</span>
      </div>
      <Textarea
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder='Scrivi la tua recensione...'
        minLength={5}
        maxLength={500}
        required
        disabled={isLoading}
        className='text-sm overflow-auto !resize-none h-24'
        aria-label='Commento recensione'
      />
      {/* Bottone disabilitato se non ci sono valutazioni o commenti. */}
      <div className='flex justify-end'>
        <Button
          variant='ghost'
          className='p-0 m-0 border-0'
          type='submit'
          disabled={isLoading || rating === 0 || !comment.trim()}
        >
          {isLoading ? (
            'Invio...'
          ) : (
            <SendHorizontal className='p-0 m-0 border-0 text-red-600 !w-6 !h-6' />
          )}
        </Button>
      </div>
    </form>
  );
}

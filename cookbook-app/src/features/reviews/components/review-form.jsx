import { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Star, SendHorizontal } from 'lucide-react';
import { DayPicker } from '@/features/reviews/components/day-picker.jsx';

export default function ReviewForm({ onSubmit, isLoading }) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [difficulty, setDifficulty] = useState(0);
  const [preparationDate, setPreparationDate] = useState(undefined);

  return (
    <form
      className='space-y-3'
      onSubmit={e => {
        e.preventDefault();
        if (rating > 0 && difficulty > 0 && preparationDate && comment.trim()) {
          onSubmit({ comment, rating, difficulty, preparationDate });
        }
      }}
    >
      <div className='flex gap-1 items-center space-x-6'>
        {/* Rating */}
        {[1, 2, 3, 4, 5].map(star => (
          <button
            type='button'
            key={`rating-${star}`}
            onClick={() => setRating(star)}
            className={star <= rating ? 'text-red-500' : 'text-gray-300'}
            aria-label={`Rate ${star} stars`} // aria label for acoustic accessibility
          >
            <Star className='w-5 h-5' />
          </button>
        ))}
        <span className='ml-2 text-sm text-black'>{rating > 0 ? `${rating}/5` : 'Rate'}</span>
        {/* Difficulty */}
        {[1, 2, 3, 4, 5].map(star => (
          <button
            type='button'
            key={`difficulty-${star}`}
            onClick={() => setDifficulty(star)}
            className={star <= difficulty ? 'text-red-500' : 'text-gray-300'}
            aria-label={`Difficulty ${star} out of 5`}
          >
            <Star className='w-5 h-5' />
          </button>
        ))}
        <span className='ml-2 text-sm text-black'>
          {difficulty > 0 ? `${difficulty}/5` : 'Difficulty'}
        </span>
        {/* Date */}
        <DayPicker
          date={preparationDate}
          setDate={setPreparationDate}
          className='!w-48'
          aria-label='Preparation date'
        />
      </div>
      <Textarea
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder='Write your review...'
        minLength={5}
        maxLength={500}
        required
        disabled={isLoading}
        className='text-sm overflow-auto !resize-none h-24'
        aria-label='Review comment'
      />
      <div className='flex justify-end'>
        <Button
          variant='ghost'
          className='p-0 m-0 border-0'
          type='submit'
          disabled={isLoading || rating === 0 || !comment.trim()}
        >
          {isLoading ? (
            'Sending...'
          ) : (
            <SendHorizontal className='p-0 m-0 border-0 text-red-600 !w-6 !h-6' />
          )}
        </Button>
      </div>
    </form>
  );
}

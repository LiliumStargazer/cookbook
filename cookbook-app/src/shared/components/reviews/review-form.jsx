import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Label } from '@/components/ui/label.jsx';

export default function ReviewForm({ onSubmit, loading = false }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = e => {
    e.preventDefault();
    if (rating === 0) {
      return;
    }
    onSubmit({ rating, comment });
    setRating(0);
    setComment('');
  };

  const renderStarButton = starNumber => (
    <button
      key={starNumber}
      type='button'
      className={`text-2xl transition-colors ${
        starNumber <= (hoveredRating || rating) ? 'text-yellow-400' : 'text-gray-300'
      }`}
      onMouseEnter={() => setHoveredRating(starNumber)}
      onMouseLeave={() => setHoveredRating(0)}
      onClick={() => setRating(starNumber)}
    >
      ★
    </button>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg'>Aggiungi una recensione</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <Label className='text-sm font-medium'>Valutazione</Label>
            <div className='flex items-center space-x-1 mt-2'>
              {[1, 2, 3, 4, 5].map(renderStarButton)}
            </div>
            {rating === 0 && (
              <p className='text-xs text-muted-foreground mt-1'>Seleziona una valutazione</p>
            )}
          </div>

          <div>
            <Label htmlFor='comment' className='text-sm font-medium'>
              Commento
            </Label>
            <Textarea
              id='comment'
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder='Scrivi qui la tua recensione...'
              rows={4}
              className='mt-2'
            />
          </div>

          <Button type='submit' disabled={rating === 0 || loading} className='w-full'>
            {loading ? 'Pubblicazione...' : 'Pubblica Recensione'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

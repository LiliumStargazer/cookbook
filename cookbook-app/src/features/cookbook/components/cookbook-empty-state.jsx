import { BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { useNavigate } from 'react-router-dom';

export default function CookbookEmptyState() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/search`);
  };

  return (
    <Card className='max-w-md mx-auto'>
      <CardContent className='text-center p-8'>
        <BookOpen className='w-16 h-16 mx-auto mb-4 text-gray-300' />
        <h3 className='text-lg font-semibold mb-2'>Your cookbook is empty</h3>
        <p className='text-gray-500 mb-4'>
          Start exploring recipes and add them to your personal cookbook
        </p>
        <Button variant='destructive' onClick={handleClick}>
          Explore Recipes
        </Button>
      </CardContent>
    </Card>
  );
}

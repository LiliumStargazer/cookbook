import { BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import {useNavigate} from "react-router-dom";

export default function CookbookEmptyState() {
const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/search`);
    };

  return (
    <Card className='max-w-md mx-auto'>
      <CardContent className='text-center p-8'>
        <BookOpen className='w-16 h-16 mx-auto mb-4 text-gray-300' />
        <h3 className='text-lg font-semibold mb-2'>Il tuo ricettario è vuoto</h3>
        <p className='text-gray-500 mb-4'>
          Inizia ad esplorare le ricette e aggiungile al tuo ricettario personale
        </p>
        <Button variant="destructive" onClick={handleClick}>
          Esplora Ricette
        </Button>
      </CardContent>
    </Card>
  );
}

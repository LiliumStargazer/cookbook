import { Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card.jsx';
import RecipeCardContainer from './recipe-card-container.jsx';

export default function CookbookGrid({ filteredRecipes, onNoteUpdate }) {
  if (filteredRecipes.length === 0) {
    return (
      <Card className='max-w-md mx-auto'>
        <CardContent className='text-center p-8'>
          <Search className='w-12 h-12 mx-auto mb-4 text-gray-300' />
          <h3 className='text-lg font-semibold mb-2'>Nessuna ricetta trovata</h3>
          <p className='text-gray-500'>
            Prova a modificare i filtri di ricerca o esplora nuove ricette da aggiungere.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {filteredRecipes.map(recipe => (
        <RecipeCardContainer key={recipe._id} recipe={recipe} onNoteUpdate={onNoteUpdate} />
      ))}
    </div>
  );
}

import { ChefHat } from 'lucide-react';
import { Badge } from '@/components/ui/badge.jsx';

export default function CookbookHeader({ userRecipes }) {
  const recipesWithNotes = userRecipes.filter(r => r.note).length;

  return (
    <div className='mb-8'>
      <div className='flex items-center gap-3 mb-4'>
        <ChefHat className='w-8 h-8 text-red-600' />
        <h1 className='text-3xl font-bold text-gray-900'>Il Mio Ricettario</h1>
      </div>
      <p className='text-gray-600'>
        Gestisci le tue ricette preferite e aggiungi note personali per ricordarti trucchi e
        variazioni.
      </p>

      {userRecipes.length > 0 && (
        <div className='flex items-center gap-2 mt-4'>
          <Badge variant='outline' className='text-sm'>
            {userRecipes.length} ricett{userRecipes.length === 1 ? 'a' : 'e'} salvat
            {userRecipes.length === 1 ? 'a' : 'e'}
          </Badge>
          <Badge variant='outline' className='text-sm'>
            {recipesWithNotes} con note
          </Badge>
        </div>
      )}
    </div>
  );
}

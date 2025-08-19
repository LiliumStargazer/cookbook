import { ChefHat } from 'lucide-react';
import { Badge } from '@/components/ui/badge.jsx';

export default function CookbookHeader({ userRecipes }) {
  const recipesWithNotes = userRecipes.filter(r => r.note).length;

  return (
    <div className='mb-8'>
      <div className='flex items-center gap-3 mb-4'>
        <ChefHat className='w-8 h-8 text-red-600' />
        <h1 className='text-3xl font-bold text-gray-900'>My Cookbook</h1>
      </div>
      <p className='text-gray-600'>
        Manage your favorite recipes and add personal notes to remember tips and variations.
      </p>

      {userRecipes.length > 0 && (
        <div className='flex items-center gap-2 mt-4'>
          <Badge variant='outline' className='text-sm'>
            {userRecipes.length} saved recipe{userRecipes.length === 1 ? '' : 's'}
          </Badge>
          <Badge variant='outline' className='text-sm'>
            {recipesWithNotes} with notes
          </Badge>
        </div>
      )}
    </div>
  );
}

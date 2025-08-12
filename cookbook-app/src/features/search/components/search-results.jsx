import { Card, CardContent } from '@/components/ui/card.jsx';
import RecipeCard from '@/shared/components/recipe-card.jsx';

export default function SearchResults({ meals, loading }) {
  if (loading) {
    return (
      <div className='text-center py-8'>
        <p>Caricamento...</p>
      </div>
    );
  }

  if (meals.length === 0) {
    return (
      <Card>
        <CardContent className='py-12 text-center'>
          <p className='text-muted-foreground'>
            Nessuna ricetta trovata. Prova a cercare qualcosa!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {meals.map(meal => (
        <RecipeCard key={meal.idMeal} recipe={meal} />
      ))}
    </div>
  );
}

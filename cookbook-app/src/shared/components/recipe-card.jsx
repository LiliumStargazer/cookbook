import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function RecipeCard({ recipe, children, isInCookbook }) {
  const navigate = useNavigate();

  const handleViewRecipe = () => {
    navigate(`/meal/${recipe.idRecipe}`);
  };

  return (
    <Card className='hover:shadow-lg transition-shadow'>
      <div className='aspect-video relative overflow-hidden rounded-t-lg'>
        {isInCookbook && (
          <Badge
            variant='!default'
            className='absolute top-2 right-2 !bg-primary border-0 text-white'
          >
            <Heart /> In Cookbook
          </Badge>
        )}
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className='w-full h-full object-cover'
        />
      </div>
      <CardHeader>
        <CardTitle className='text-lg'>{recipe.strMeal}</CardTitle>
        {recipe.strCategory && (
          <Badge variant='outline' className='w-fit'>
            {recipe.strCategory}
          </Badge>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className='p-4 pt-0'>
        <Button className='w-full' variant='outline' onClick={handleViewRecipe}>
          Vedi Ricetta
        </Button>
      </CardFooter>
    </Card>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Users } from 'lucide-react';

export default function IngredientsList({ ingredients }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center'>
          <Users className='w-5 h-5 mr-2' />
          Ingredients
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className='space-y-2'>
          {ingredients.map((item, index) => (
            <li key={index} className='flex justify-between'>
              <span>{item.ingredient}</span>
              <span className='text-muted-foreground'>{item.measure}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

import { Button } from '@/components/ui/button.jsx';
import { Heart, HeartHandshake, Loader2 } from 'lucide-react';
import { useToggleCookbook } from '@/features/recipe/hooks/use-toggle-cookbook.js';

export default function AddToCookbookButton({ meal }) {
  const { loading, isInUserCookbook, toggleCookbook } = useToggleCookbook(meal);

  return (
    <div className="flex gap-2 w-full">
      <Button
        onClick={toggleCookbook}
        disabled={loading}
        variant={isInUserCookbook ? 'destructive' : 'outline'}
        className="flex-1"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : isInUserCookbook ? (
          <Heart className="w-4 h-4 mr-2 fill-current" />
        ) : (
          <HeartHandshake className="w-4 h-4 mr-2" />
        )}
        {isInUserCookbook ? 'Rimuovi dal ricettario' : 'Aggiungi al ricettario'}
      </Button>
    </div>
  );
}

import { useRecipeCard } from '@/features/cookbook/hooks/use-recipe-card.js';
import RecipeNoteSection from './recipe-note-section.jsx';
import RecipeCard from '../../../shared/components/recipe-card.jsx';

export default function RecipeCardContainer({ recipe, onNoteUpdate }) {
  const {
    isEditingNote,
    noteText,
    isLoading,
    setNoteText,
    handleSaveNote,
    handleRemoveNote,
    handleCancelEdit,
    startEditingNote,
  } = useRecipeCard(recipe, onNoteUpdate);

  return (
    <RecipeCard meal={recipe}>
      <RecipeNoteSection
        isEditingNote={isEditingNote}
        noteText={noteText}
        isLoading={isLoading}
        setNoteText={setNoteText}
        handleSaveNote={handleSaveNote}
        handleRemoveNote={handleRemoveNote}
        handleCancelEdit={handleCancelEdit}
        startEditingNote={startEditingNote}
        recipe={recipe}
      />
    </RecipeCard>
  );
}

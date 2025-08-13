import { useState } from 'react';
import { removeRecipeNote, updateRecipeNote } from '@/features/cookbook/services/api-cookbook.js';
import { toast } from 'sonner';

export function useRecipeCard(recipe, onNoteUpdate) {
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteText, setNoteText] = useState(recipe.note || '');
  const [loadingNote, setLoadingNote] = useState({});
  //const { loadingNote, updateNote, removeNote } = useRecipeNote();

  const isLoading = loadingNote[recipe._id];

  const handleSaveNote = async () => {
    try {
      setLoadingNote(prev => ({ ...prev, [recipe._id]: true }));

      const result = await updateRecipeNote(recipe._id, noteText);
      if (result.success) {
        toast.success('Nota aggiornata con successo');
        setIsEditingNote(false);
        onNoteUpdate?.();
        return { success: true };
      } else {
        toast.error(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error("Errore nell'aggiornamento della nota:", error);
      toast.error("Errore nell'aggiornamento della nota");
    } finally {
      setLoadingNote(prev => ({ ...prev, [recipe._id]: false }));
    }
  };

  const handleRemoveNote = async () => {
    try {
      setLoadingNote(prev => ({ ...prev, [recipe._id]: true }));

      const result = await removeRecipeNote(recipe._id);

      if (result.success) {
        toast.success('Nota rimossa con successo');
        setNoteText('');
        setIsEditingNote(false);
        onNoteUpdate?.(recipe._id, '');
        return { success: true };
      } else {
        toast.error(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Errore nella rimozione della nota:', error);
      toast.error('Errore nella rimozione della nota');
    } finally {
      setLoadingNote(prev => ({ ...prev, [recipe._id]: false }));
    }
  };

  const handleCancelEdit = () => {
    setNoteText(recipe.note || '');
    setIsEditingNote(false);
  };

  const startEditingNote = () => {
    setIsEditingNote(true);
  };

  return {
    // Stati
    isEditingNote,
    noteText,
    isLoading,

    // Setters
    setNoteText,

    // Actions
    handleSaveNote,
    handleRemoveNote,
    handleCancelEdit,
    startEditingNote,
  };
}

import { useState } from 'react';
import { toast } from 'sonner';
import { updateRecipeNote, removeRecipeNote } from '@/features/cookbook/services/api-cookbook.js';

export function useRecipeNote() {
  const [loadingNote, setLoadingNote] = useState({});

  const updateNote = async (recipeId, note) => {
    try {
      setLoadingNote(prev => ({ ...prev, [recipeId]: true }));

      const result = await updateRecipeNote(recipeId, note);

      if (result.success) {
        toast.success('Nota aggiornata con successo');
        return { success: true };
      } else {
        toast.error(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error("Errore nell'aggiornamento della nota:", error);
      toast.error("Errore nell'aggiornamento della nota");
      return { success: false, error: error.message };
    } finally {
      setLoadingNote(prev => ({ ...prev, [recipeId]: false }));
    }
  };

  const removeNote = async recipeId => {
    try {
      setLoadingNote(prev => ({ ...prev, [recipeId]: true }));

      const result = await removeRecipeNote(recipeId);

      if (result.success) {
        toast.success('Nota rimossa con successo');
        return { success: true };
      } else {
        toast.error(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Errore nella rimozione della nota:', error);
      toast.error('Errore nella rimozione della nota');
      return { success: false, error: error.message };
    } finally {
      setLoadingNote(prev => ({ ...prev, [recipeId]: false }));
    }
  };

  return {
    loadingNote,
    updateNote,
    removeNote,
  };
}

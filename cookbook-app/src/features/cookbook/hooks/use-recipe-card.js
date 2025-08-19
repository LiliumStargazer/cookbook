import { useState, useCallback } from 'react';
import { removeRecipeNote, updateRecipeNote } from '@/features/cookbook/services/api-cookbook.js';
import { toast } from 'sonner';

export function useRecipeCard(recipe, onNoteUpdate) {
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteText, setNoteText] = useState(recipe.note || '');
  const [loadingNote, setLoadingNote] = useState({});

  const isLoading = loadingNote[recipe._id];

  const handleSaveNote = useCallback(async () => {
    try {
      setLoadingNote(prev => ({ ...prev, [recipe._id]: true }));
      const response = await updateRecipeNote(recipe._id, noteText);
      if (response.success) {
        toast.success('Note updated successfully');
        setIsEditingNote(false);
        onNoteUpdate?.();
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingNote(prev => ({ ...prev, [recipe._id]: false }));
    }
  }, [recipe._id, noteText, onNoteUpdate]);

  const handleRemoveNote = useCallback(async () => {
    try {
      setLoadingNote(prev => ({ ...prev, [recipe._id]: true }));
      const response = await removeRecipeNote(recipe._id);

      if (response.success) {
        toast.success('Note removed successfully');
        setNoteText('');
        setIsEditingNote(false);
        onNoteUpdate?.(recipe._id, '');
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      toast.error(error.message || 'Error removing note');
    } finally {
      setLoadingNote(prev => ({ ...prev, [recipe._id]: false }));
    }
  }, [recipe._id, onNoteUpdate]);

  const handleCancelEdit = useCallback(() => {
    setNoteText(recipe.note || '');
    setIsEditingNote(false);
  }, [recipe.note]);

  const startEditingNote = useCallback(() => {
    setIsEditingNote(true);
  }, []);

  return {
    isEditingNote,
    noteText,
    isLoading,
    setNoteText,
    handleSaveNote,
    handleRemoveNote,
    handleCancelEdit,
    startEditingNote,
  };
}

import { useState } from 'react';
import { useRecipeNote } from '@/features/cookbook/hooks/use-recipe-note.js';

export function useRecipeCard(recipe, onNoteUpdate) {
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteText, setNoteText] = useState(recipe.note || '');
  const { loadingNote, updateNote, removeNote } = useRecipeNote();

  const isLoading = loadingNote[recipe._id];

  const handleSaveNote = async () => {
    const result = await updateNote(recipe._id, noteText);
    if (result.success) {
      setIsEditingNote(false);
      onNoteUpdate?.(recipe._id, noteText);
    }
  };

  const handleRemoveNote = async () => {
    const result = await removeNote(recipe._id);
    if (result.success) {
      setNoteText('');
      setIsEditingNote(false);
      onNoteUpdate?.(recipe._id, '');
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

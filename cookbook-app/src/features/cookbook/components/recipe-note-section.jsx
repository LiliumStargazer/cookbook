import { Button } from '@/components/ui/button.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { NotebookPen, Save, X, Trash2, Loader2, PenLine } from 'lucide-react';

export default function RecipeNoteSection({
  isEditingNote,
  noteText,
  isLoading,
  setNoteText,
  handleSaveNote,
  handleRemoveNote,
  handleCancelEdit,
  startEditingNote,
  recipe,
}) {
  return (
    <div className='border-t pt-3 mt-3'>
      <div className='flex items-center justify-between mb-2'>
        <span className='text-sm font-medium text-gray-700 flex items-center'>
          <NotebookPen className='w-4 h-4 mr-1' />
          Nota personale
        </span>

        <Button
          variant='ghost'
          size='sm'
          onClick={isEditingNote ? handleSaveNote : startEditingNote}
          className='h-6 px-2 text-xs'
        >
          {isEditingNote ? <Save className='w-3 h-3 mr-1' /> : <PenLine className='w-3 h-3 mr-1' />}
        </Button>
      </div>

      {isEditingNote ? (
        <div className='space-y-2'>
          <Textarea
            value={noteText}
            onChange={e => setNoteText(e.target.value)}
            placeholder='Aggiungi una nota personale per questa ricetta...'
            className='min-h-[80px] text-sm'
            disabled={isLoading}
          />
        </div>
      ) : (
        <div className='text-sm text-gray-600 min-h-[60px]'>
          {recipe.note ? (
            <p className='bg-gray-50 p-2 rounded text-sm italic'>&ldquo;{recipe.note}&rdquo;</p>
          ) : (
            <p className='text-gray-400 italic'>Nessuna nota aggiunta</p>
          )}
        </div>
      )}
    </div>
  );
}

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
    <div className='border-t pt-3 mt-1'>
      <div className='flex items-center justify-between mb-2'>
        <span className='text-sm font-medium text-gray-700 flex items-center'>
          <NotebookPen className='w-4 h-4 mr-1' />
          Personal note
        </span>
        <Button
          variant='ghost'
          size='sm'
          onClick={isEditingNote ? handleSaveNote : startEditingNote}
          className='h-6 px-2 text-xs'
        >
          {isEditingNote ? <Save className='w-3 h-3 mr-1' /> : <PenLine className='w-3 h-3 mr-1' />}
        </Button>
        {isEditingNote ? (
          <Button
            variant='ghost'
            size='sm'
            onClick={handleCancelEdit}
            className='h-6 px-2 text-xs'
            disabled={isLoading}
          >
            <X className='w-3 h-3 mr-1' />
          </Button>
        ) : (
          <Button
            variant='ghost'
            size='sm'
            onClick={handleRemoveNote}
            className='h-6 px-2 text-xs'
            disabled={isLoading || !recipe.note}
          >
            {isLoading ? (
              <Loader2 className='animate-spin w-3 h-3 mr-1' />
            ) : (
              <Trash2 className='w-3 h-3 mr-1' />
            )}
          </Button>
        )}
      </div>
      {/* Fixed height to avoid shift */}
      <div className='h-24'>
        {isEditingNote ? (
          <Textarea
            value={noteText}
            onChange={e => setNoteText(e.target.value)}
            placeholder='Add a personal note for this recipe...'
            className='h-full text-sm !resize-none leading-snug overflow-auto'
            disabled={isLoading}
          />
        ) : recipe.note ? (
          <p className='h-full bg-gray-50 p-2 rounded text-sm italic leading-snug overflow-auto'>
            &ldquo;{recipe.note}&rdquo;
          </p>
        ) : (
          <div className='h-full flex items-center justify-start text-gray-400 italic text-sm leading-snug'>
            No note added
          </div>
        )}
      </div>
    </div>
  );
}

import { BookOpen } from 'lucide-react';

export default function CookbookLoadingState() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex items-center justify-center h-64'>
        <div className='text-center'>
          <BookOpen className='w-12 h-12 mx-auto mb-4 text-gray-400 animate-pulse' />
          <p className='text-gray-500'>Caricamento ricettario...</p>
        </div>
      </div>
    </div>
  );
}

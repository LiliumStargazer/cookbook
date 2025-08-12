import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input.jsx';
import { Button } from '@/components/ui/button.jsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.jsx';

export default function CookbookFilters({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedArea,
  setSelectedArea,
  categories,
  areas,
  filteredRecipes,
  onClearFilters,
}) {
  const hasActiveFilters = searchTerm || selectedCategory !== 'all' || selectedArea !== 'all';

  return (
    <div className='mb-6 space-y-4'>
      <div className='flex flex-col sm:flex-row gap-4'>
        {/* Barra di ricerca */}
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
          <Input
            placeholder='Cerca nelle tue ricette...'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className='!pl-10'
          />
        </div>

        {/* Filtri */}
        <div className='flex gap-2'>
          <Filter className='w-4 h-4 mr-1 mt-2' />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className='w-[190px]'>
              <SelectValue placeholder='Categoria' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Tutte le categorie</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedArea} onValueChange={setSelectedArea}>
            <SelectTrigger className='w-[190px]'>
              <SelectValue placeholder='Origine' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Tutte le origini</SelectItem>
              {areas.map(area => (
                <SelectItem key={area} value={area}>
                  {area}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Contatore risultati filtrati */}
      {hasActiveFilters && (
        <div className='flex items-center justify-between'>
          <p className='text-sm text-gray-600'>
            {filteredRecipes.length} ricett
            {filteredRecipes.length === 1 ? 'a trovata' : 'e trovate'}
          </p>
          <Button variant='ghost' size='sm' onClick={onClearFilters}>
            Pulisci filtri
          </Button>
        </div>
      )}
    </div>
  );
}

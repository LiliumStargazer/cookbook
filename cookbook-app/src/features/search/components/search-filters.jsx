import { Card, CardContent } from '@/components/ui/card.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Button } from '@/components/ui/button.jsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { SearchIcon, Shuffle, FilterIcon } from 'lucide-react';

export default function SearchFilters({
  searchQuery,
  loading,
  categories,
  areas,
  ingredients,
  selectedCategory,
  selectedArea,
  selectedIngredient,
  showFilters,
  onSearchQueryChange,
  onSearch,
  onRandomMeal,
  onCategoryFilter,
  onAreaFilter,
  onIngredientFilter,
  onClearFilters,
  onToggleFilters,
}) {
  return (
    <Card className='mb-6'>
      <CardContent className='p-6'>
        <div className='flex flex-col space-y-4'>
          {/* Search by keyword */}
          <div className='flex space-x-2'>
            <div className='flex-1'>
              <Input
                placeholder='Search recipes by name... (e.g. pasta, chicken, pizza)'
                value={searchQuery}
                onChange={e => onSearchQueryChange(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && onSearch()}
              />
            </div>
            <Button variant='destructive' onClick={onSearch} disabled={loading}>
              <SearchIcon className='w-4 h-4 mr-2' />
              Search
            </Button>
            <Button variant='outline' onClick={onRandomMeal} disabled={loading}>
              <Shuffle className='w-4 h-4 mr-2' />
              Random
            </Button>
          </div>

          {/* Toggle filters */}
          <div className='flex items-center justify-between'>
            <Button variant='ghost' size='sm' onClick={onToggleFilters}>
              <FilterIcon className='w-4 h-4 mr-2' />
              {showFilters ? 'Hide' : 'Show'} Filters
            </Button>

            {(selectedCategory || selectedArea || selectedIngredient) && (
              <Button variant='ghost' size='sm' onClick={onClearFilters}>
                Clear Filters
              </Button>
            )}
          </div>

          {/* Expandable filters */}
          {showFilters && (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t'>
              <div>
                <label className='text-sm font-medium mb-2 block'>Category</label>
                <Select value={selectedCategory} onValueChange={onCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select category' />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.strCategory} value={category.strCategory}>
                        {category.strCategory}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className='text-sm font-medium mb-2 block'>Ingredient</label>
                <Select value={selectedIngredient} onValueChange={onIngredientFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select ingredient' />
                  </SelectTrigger>
                  <SelectContent>
                    {ingredients.map(ingredient => (
                      <SelectItem key={ingredient.strIngredient} value={ingredient.strIngredient}>
                        {ingredient.strIngredient}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className='text-sm font-medium mb-2 block'>Origin</label>
                <Select value={selectedArea} onValueChange={onAreaFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select origin' />
                  </SelectTrigger>
                  <SelectContent>
                    {areas.map(area => (
                      <SelectItem key={area.strArea} value={area.strArea}>
                        {area.strArea}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Active filters */}
          {(selectedCategory || selectedArea || selectedIngredient) && (
            <div className='flex flex-wrap gap-2'>
              {selectedCategory && selectedCategory !== 'None' && selectedCategory !== '' && (
                <Badge variant='secondary'>Category: {selectedCategory}</Badge>
              )}
              {selectedIngredient && selectedIngredient !== 'None' && selectedIngredient !== '' && (
                <Badge variant='secondary'>Ingredient: {selectedIngredient}</Badge>
              )}
              {selectedArea && selectedArea !== 'None' && selectedArea !== '' && (
                <Badge variant='secondary'>Origin: {selectedArea}</Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

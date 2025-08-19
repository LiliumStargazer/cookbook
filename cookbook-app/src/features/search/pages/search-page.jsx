import NavBar from '@/shared/components/navbar.jsx';
import { useSearch } from '../hooks/use-search.js';
import SearchFilters from '../components/search-filters.jsx';
import SearchResults from '../components/search-results.jsx';

export default function SearchPage() {
  const {
    searchQuery,
    meals,
    loading,
    categories,
    areas,
    ingredients,
    selectedCategory,
    selectedArea,
    selectedIngredient,
    showFilters,
    setSearchQuery,
    handleSearch,
    handleRandomMeal,
    handleCategoryFilter,
    handleAreaFilter,
    handleIngredientFilter,
    clearFilters,
    toggleFilters,
  } = useSearch();

  return (
    <div className='w-full'>
      <NavBar />
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-6xl mx-auto'>
          {/* Header */}
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold mb-2'>Search Recipes</h1>
            <p className='text-muted-foreground'>
              Explore thousands of recipes from around the world
            </p>
          </div>

          {/* Search filters */}
          <SearchFilters
            searchQuery={searchQuery}
            loading={loading}
            categories={categories}
            areas={areas}
            ingredients={ingredients}
            selectedCategory={selectedCategory}
            selectedArea={selectedArea}
            selectedIngredient={selectedIngredient}
            showFilters={showFilters}
            onSearchQueryChange={setSearchQuery}
            onSearch={handleSearch}
            onRandomMeal={handleRandomMeal}
            onCategoryFilter={handleCategoryFilter}
            onAreaFilter={handleAreaFilter}
            onIngredientFilter={handleIngredientFilter}
            onClearFilters={clearFilters}
            onToggleFilters={toggleFilters}
          />

          {/* Results */}
          <SearchResults meals={meals} loading={loading} />
        </div>
      </div>
    </div>
  );
}

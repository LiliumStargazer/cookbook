import CookbookHeader from '@/features/cookbook/components/cookbook-header.jsx';
import CookbookEmptyState from '@/features/cookbook/components/cookbook-empty-state.jsx';
import CookbookLoadingState from '@/features/cookbook/components/cookbook-loading-state.jsx';
import CookbookFilters from '@/features/cookbook/components/cookbook-filters.jsx';
import CookbookGrid from '@/features/cookbook/components/cookbook-grid.jsx';
import { useCookbookPage } from '@/features/cookbook/hooks/use-cookbook-page.js';
import NavBar from '@/shared/components/navbar.jsx';

export default function CookbookPage() {
  const {
    userRecipes,
    filteredRecipes,
    categories,
    areas,
    loading,
    searchTerm,
    selectedCategory,
    selectedArea,
    setSearchTerm,
    setSelectedCategory,
    setSelectedArea,
    handleNoteUpdate,
    handleClearFilters,
  } = useCookbookPage();

  if (loading) {
    return <CookbookLoadingState />;
  }

  return (
    <div className='w-full'>
      <NavBar />
      <div className='container mx-auto px-4 py-8'>
        <CookbookHeader userRecipes={userRecipes} />

        {userRecipes.length === 0 ? (
          <CookbookEmptyState />
        ) : (
          <>
            <CookbookFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedArea={selectedArea}
              setSelectedArea={setSelectedArea}
              categories={categories}
              areas={areas}
              filteredRecipes={filteredRecipes}
              onClearFilters={handleClearFilters}
            />

            <CookbookGrid filteredRecipes={filteredRecipes} onNoteUpdate={handleNoteUpdate} />
          </>
        )}
      </div>
    </div>
  );
}

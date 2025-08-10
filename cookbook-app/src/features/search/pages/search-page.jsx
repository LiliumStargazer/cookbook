import NavBar from "@/shared/components/navbar.jsx";
import { useSearch } from "../hooks/use-search.js";
import SearchFilters from "../components/search-filters.jsx";
import SearchResults from "../components/search-results.jsx";
import React from "react";

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
        toggleFilters
    } = useSearch();

    return (
        <div className="w-full">
            <NavBar />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-2">Cerca Ricette</h1>
                        <p className="text-muted-foreground">
                            Esplora migliaia di ricette da tutto il mondo
                        </p>
                    </div>

                    {/* Filtri di ricerca */}
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

                    {/* Risultati */}
                    <SearchResults
                        meals={meals}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
}
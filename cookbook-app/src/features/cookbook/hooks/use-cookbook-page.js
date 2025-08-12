import { useState, useMemo } from 'react';
import { useCookbook } from '@/features/cookbook/hooks/use-cookbook.js';

export function useCookbookPage() {
  const { userRecipes, loading, refetch } = useCookbook();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArea, setSelectedArea] = useState('all');

  // Funzione per aggiornare localmente le note dopo il salvataggio
  const handleNoteUpdate = (recipeId, newNote) => {
    // Trigger del refetch per aggiornare i dati dal server
    refetch();
  };

  // Filtraggio delle ricette con useMemo per ottimizzare le performance
  const filteredRecipes = useMemo(() => {
    return userRecipes.filter(recipe => {
      const matchesSearch = recipe.strMeal.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || recipe.strCategory === selectedCategory;
      const matchesArea = selectedArea === 'all' || recipe.strArea === selectedArea;

      return matchesSearch && matchesCategory && matchesArea;
    });
  }, [userRecipes, searchTerm, selectedCategory, selectedArea]);

  // Ottieni categorie e aree uniche con useMemo per ottimizzare
  const categories = useMemo(() => {
    return [...new Set(userRecipes.map(recipe => recipe.strCategory))].filter(Boolean);
  }, [userRecipes]);

  const areas = useMemo(() => {
    return [...new Set(userRecipes.map(recipe => recipe.strArea))].filter(Boolean);
  }, [userRecipes]);

  // Funzione per pulire tutti i filtri
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedArea('all');
  };

  // Verifica se ci sono filtri attivi
  const hasActiveFilters = searchTerm || selectedCategory !== 'all' || selectedArea !== 'all';

  return {
    // Dati
    userRecipes,
    filteredRecipes,
    categories,
    areas,
    loading,

    // Stati dei filtri
    searchTerm,
    selectedCategory,
    selectedArea,
    hasActiveFilters,

    // Setters per i filtri
    setSearchTerm,
    setSelectedCategory,
    setSelectedArea,

    // Funzioni
    handleNoteUpdate,
    handleClearFilters,
    refetch,
  };
}

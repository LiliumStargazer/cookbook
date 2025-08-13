import { useState, useMemo, useEffect } from 'react';
import { getUserRecipes } from '@/features/cookbook/services/api-cookbook.js';
import { toast } from 'sonner';

export function useCookbook() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArea, setSelectedArea] = useState('all');
  const [userRecipes, setUserRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Carica le ricette dell'utente
  const fetchUserRecipes = async () => {
    try {
      setLoading(true);
      const response = await getUserRecipes();
      if (response.success) {
        setUserRecipes(response.data);
      } else {
        toast.error(response.error);
      }
    } catch (err) {
      toast.error(err.response?.data || 'Errore nel caricamento delle ricette');
    } finally {
      setLoading(false);
    }
  };

  // Verifica se una ricetta è già nel ricettario
  const isInCookbook = mealId => {
    return userRecipes.some(recipe => recipe.idRecipe === mealId);
  };

  useEffect(() => {
    fetchUserRecipes().catch(error => {
      toast.error('sono in errore', error || 'Errore nel caricamento delle ricette');
    });
  }, []);

  // Filtraggio delle ricette - useMemo per ottimizzare le performance
  const filteredRecipes = useMemo(() => {
    return userRecipes.filter(recipe => {
      const matchesSearch = recipe.strMeal.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || recipe.strCategory === selectedCategory;
      const matchesArea = selectedArea === 'all' || recipe.strArea === selectedArea;

      return matchesSearch && matchesCategory && matchesArea;
    });
  }, [userRecipes, searchTerm, selectedCategory, selectedArea]);

  // Ottieni categorie e aree uniche - useMemo per ottimizzare
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
    handleClearFilters,
    isInCookbook,
    refetch: fetchUserRecipes,
    fetchUserRecipes,
  };
}

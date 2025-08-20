import { useState, useMemo, useEffect, useCallback } from 'react';
import { getUserRecipes } from '@/features/cookbook/services/api-cookbook.js';
import { toast } from 'sonner';

export function useCookbook() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArea, setSelectedArea] = useState('all');
  const [userRecipes, setUserRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load user recipes (callback for consistency)
  const fetchUserRecipes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getUserRecipes();
      if (response.success) {
        setUserRecipes(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error(err.message || 'Error loading recipes');
    } finally {
      setLoading(false);
    }
  }, []);

  const isInCookbook = mealId => {
    return userRecipes.some(recipe => recipe.idMeal === mealId);
  };

  useEffect(() => {
    fetchUserRecipes().catch(error => {
      toast.error(error.message || 'Error loading recipes');
    });
  }, [fetchUserRecipes]);

  const filteredRecipes = useMemo(() => {
    return userRecipes.filter(recipe => {
      const matchesSearch = recipe.strMeal.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || recipe.strCategory === selectedCategory;
      const matchesArea = selectedArea === 'all' || recipe.strArea === selectedArea;

      return matchesSearch && matchesCategory && matchesArea;
    });
  }, [userRecipes, searchTerm, selectedCategory, selectedArea]);

  const categories = useMemo(() => {
    return [...new Set(userRecipes.map(recipe => recipe.strCategory))].filter(Boolean);
  }, [userRecipes]);

  const areas = useMemo(() => {
    return [...new Set(userRecipes.map(recipe => recipe.strArea))].filter(Boolean);
  }, [userRecipes]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedArea('all');
  };

  const hasActiveFilters = searchTerm || selectedCategory !== 'all' || selectedArea !== 'all';

  return {
    userRecipes,
    filteredRecipes,
    categories,
    areas,
    loading,
    searchTerm,
    selectedCategory,
    selectedArea,
    hasActiveFilters,
    setSearchTerm,
    setSelectedCategory,
    setSelectedArea,
    handleClearFilters,
    isInCookbook,
    refetch: fetchUserRecipes,
    fetchUserRecipes,
  };
}

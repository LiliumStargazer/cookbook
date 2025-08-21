import { useState, useEffect, useCallback } from 'react';
import {
  searchMealByName,
  getMealCategories,
  filterMealByCategory,
  filterMealByArea,
  getMealList,
  filterMealByIngredient,
} from '@/features/search/services/api-mealdb.js';
import { toast } from 'sonner';
import { getRandomMeal } from '@/shared/services/get-random-meal.js';

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  // States for selected filters
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState('');
  // State to show/hide filters
  const [showFilters, setShowFilters] = useState(false);

  // Load categories and areas on mount
  const loadInitialData = useCallback(async () => {
    try {
      //promise.all to fetch categories, areas, and ingredients concurrently
      const [categoriesResponse, areasResponse, ingredientsResponse] = await Promise.all([
        getMealCategories(),
        getMealList('a'),
        getMealList('i'),
      ]);

      if (categoriesResponse.success) {
        setCategories([{ strCategory: 'None' }, ...(categoriesResponse.data.categories || [])]);
      } else {
        toast.error(categoriesResponse.message || 'Error loading categories');
      }
      if (areasResponse.success) {
        setAreas([{ strArea: 'None' }, ...(areasResponse.data.meals || [])]);
      } else {
        toast.error(areasResponse.message || 'Error loading areas');
      }
      if (ingredientsResponse.success) {
        setIngredients([{ strIngredient: 'None' }, ...(ingredientsResponse.data.meals || [])]);
      } else {
        toast.error(ingredientsResponse.message || 'Error loading ingredients');
      }
    } catch (error) {
      toast.error(error.message || 'Error loading initial data');
    }
  }, []);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) {
      toast.error('Enter a keyword to search');
      return;
    }
    setLoading(true);
    try {
      const result = await searchMealByName(searchQuery);
      if (result.success) {
        setMeals(result.data.meals || []);
        if (!result.data.meals || result.data.meals.length === 0) {
          toast.info('No recipes found');
        }
      } else {
        toast.error(result.message);
        setMeals([]);
      }
    } catch (error) {
      toast.error(error.message);
      setMeals([]);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  const handleRandomMeal = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getRandomMeal();
      if (result.success) {
        setMeals(result.data.meals || []);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCategoryFilter = useCallback(async category => {
    setSelectedCategory(category);
    if (!category) return;

    setLoading(true);
    try {
      const result = await filterMealByCategory(category);
      if (result.success) {
        setMeals(result.data.meals || []);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAreaFilter = useCallback(async area => {
    setSelectedArea(area);
    if (!area) return;
    // Se area è "None", non applicare il filtro
    if (area === 'None') {
      setMeals([]);
      return;
    }
    setLoading(true);
    try {
      const result = await filterMealByArea(area);
      if (result.success) {
        setMeals(result.data.meals || []);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleIngredientFilter = useCallback(async ingredient => {
    setSelectedIngredient(ingredient);
    if (!ingredient) return;
    // Se l'ingrediente è "None", non applicare il filtro
    if (ingredient === 'None') {
      setMeals([]);
      return;
    }
    setLoading(true);
    try {
      const result = await filterMealByIngredient(ingredient);
      if (result.success) {
        setMeals(result.data.meals || []);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedCategory('');
    setSelectedArea('');
    setSearchQuery('');
    setMeals([]);
  }, []);

  const toggleFilters = useCallback(() => {
    setShowFilters(prev => !prev);
  }, []);

  return {
    // State
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

    // Setters
    setSearchQuery,

    // Actions
    handleSearch,
    handleRandomMeal,
    handleCategoryFilter,
    handleAreaFilter,
    handleIngredientFilter,
    clearFilters,
    toggleFilters,
  };
}

import { useState, useEffect } from 'react';
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
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [categoriesResult, areasResult, ingredientResult] = await Promise.all([
        getMealCategories(),
        getMealList('a'), // 'a' for areas
        getMealList('i'), // 'i' for ingredients
      ]);

      if (categoriesResult.success) {
        const categoriesWithAll = [
          { strCategory: 'None' }, // Empty option for "All categories"
          ...(categoriesResult.data.categories || []),
        ];
        setCategories(categoriesWithAll);
      }
      if (areasResult.success) {
        const areasWithAll = [
          { strArea: 'None' }, // Empty option for "All areas"
          ...(areasResult.data.meals || []),
        ];
        setAreas(areasWithAll);
      }
      if (ingredientResult.success) {
        const ingredientResultWithAll = [
          { strIngredient: 'None' }, // Empty option for "All ingredients"
          ...(ingredientResult.data.meals || []),
        ];
        setIngredients(ingredientResultWithAll);
      }
    } catch (error) {
      toast.error('Error loading initial data');
      console.error('Error loading initial data:', error);
    }
  };

  const handleSearch = async () => {
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
        toast.error(result.error);
        setMeals([]);
      }
    } catch (error) {
      toast.error('Error during search', error);
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRandomMeal = async () => {
    setLoading(true);
    try {
      const result = await getRandomMeal();
      if (result.success) {
        setMeals(result.data.meals || []);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('Error loading random recipe', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryFilter = async category => {
    setSelectedCategory(category);
    if (!category) return;

    setLoading(true);
    try {
      const result = await filterMealByCategory(category);
      if (result.success) {
        setMeals(result.data.meals || []);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('Error filtering by category', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAreaFilter = async area => {
    setSelectedArea(area);
    if (!area) return;
    // If area is "None", do not apply filter
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
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('Error filtering by area', error);
    } finally {
      setLoading(false);
    }
  };

  const handleIngredientFilter = async ingredient => {
    setSelectedIngredient(ingredient);
    if (!ingredient) return;
    // If ingredient is "None", do not apply filter
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
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('Error filtering by ingredient', error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedArea('');
    setSearchQuery('');
    setMeals([]);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

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

import { useState, useEffect } from 'react';
import { searchMealByName, getRandomMeal, getMealCategories, filterMealByCategory, filterMealByArea, getMealList } from '../utils/api-mealdb.js';
import { toast } from "sonner";

export function useSearch() {
    const [searchQuery, setSearchQuery] = useState('');
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [areas, setAreas] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    // Carica categorie e aree all'avvio
    useEffect(() => {
        loadInitialData();
    }, []);

    const loadInitialData = async () => {
        try {
            const [categoriesResult, areasResult] = await Promise.all([
                getMealCategories(),
                getMealList('a') // 'a' per aree
            ]);

            if (categoriesResult.success) {
                setCategories(categoriesResult.data.categories || []);
            }
            if (areasResult.success) {
                setAreas(areasResult.data.meals || []);
            }
        } catch (error) {
            console.error('Errore caricamento dati iniziali:', error);
        }
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            toast.error('Inserisci una parola chiave per la ricerca');
            return;
        }

        setLoading(true);
        try {
            const result = await searchMealByName(searchQuery);
            if (result.success) {
                setMeals(result.data.meals || []);
                if (!result.data.meals || result.data.meals.length === 0) {
                    toast.info('Nessuna ricetta trovata');
                }
            } else {
                toast.error(result.error);
                setMeals([]);
            }
        } catch (error) {
            toast.error('Errore durante la ricerca');
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
            toast.error('Errore durante il caricamento della ricetta casuale');
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryFilter = async (category) => {
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
            toast.error('Errore durante il filtro per categoria');
        } finally {
            setLoading(false);
        }
    };

    const handleAreaFilter = async (area) => {
        setSelectedArea(area);
        if (!area) return;

        setLoading(true);
        try {
            const result = await filterMealByArea(area);
            if (result.success) {
                setMeals(result.data.meals || []);
            } else {
                toast.error(result.error);
            }
        } catch (error) {
            toast.error('Errore durante il filtro per area');
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
        selectedCategory,
        selectedArea,
        showFilters,

        // Setters
        setSearchQuery,

        // Actions
        handleSearch,
        handleRandomMeal,
        handleCategoryFilter,
        handleAreaFilter,
        clearFilters,
        toggleFilters
    };
}

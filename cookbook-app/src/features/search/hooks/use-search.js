import { useState, useEffect } from 'react';
import {
    searchMealByName,
    getRandomMeal,
    getMealCategories,
    filterMealByCategory,
    filterMealByArea,
    getMealList,
    filterMealByIngredient
} from '../utils/api-mealdb.js';
import { toast } from "sonner";

export function useSearch() {
    const [searchQuery, setSearchQuery] = useState('');
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [areas, setAreas] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    // Stati per i filtri selezionati
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [selectedIngredient, setSelectedIngredient] = useState('');
    // Stato per mostrare/nascondere i filtri
    const [showFilters, setShowFilters] = useState(false);

    // Carica categorie e aree all'avvio
    useEffect(() => {
        loadInitialData();
    }, []);

    const loadInitialData = async () => {
        try {
            const [categoriesResult, areasResult, ingredientResult] = await Promise.all([
                getMealCategories(),
                getMealList('a'), // 'a' per aree
                getMealList('i') // 'i' per ingredienti
            ]);

            if (categoriesResult.success) {
                const categoriesWithAll = [
                    { strCategory: 'None' }, // Opzione vuota per "Tutte le categorie"
                    ...(categoriesResult.data.categories || [])
                ];
                setCategories(categoriesWithAll);
            }
            if (areasResult.success) {
                const areasWithAll = [
                    { strArea: 'None' }, // Opzione vuota per "Tutte le aree"
                    ...(areasResult.data.meals || [])
                ];
                setAreas(areasWithAll);
            }
            if (ingredientResult.success) {
                const ingredientResultWithAll = [
                    { strIngredient: 'None' }, // Opzione vuota per "Tutte le aree"
                    ...(ingredientResult.data.meals || [])
                ];
                setIngredients(ingredientResultWithAll);
            }
        } catch (error) {
            toast.error('Errore durante il caricamento dei dati iniziali');
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
        // Se l'area è "None", non applicare il filtro
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
            toast.error('Errore durante il filtro per area');
        } finally {
            setLoading(false);
        }
    };

    const handleIngredientFilter = async (ingredient) => {
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
                toast.error(result.error);
            }
        } catch (error) {
            toast.error('Errore durante il filtro per ingrediente');
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
        toggleFilters
    };
}

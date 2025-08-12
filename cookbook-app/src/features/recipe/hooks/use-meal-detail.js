import { useState, useEffect } from 'react';
import { lookupMealById } from '@/features/search/services/api-mealdb.js';

export function useMealDetail(mealId) {
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMealDetail = async () => {
            if (!mealId) {
                setError('ID ricetta mancante');
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const result = await lookupMealById(mealId);

                if (result.success && result.data.meals && result.data.meals[0]) {
                    setMeal(result.data.meals[0]);
                } else {
                    setError('Ricetta non trovata');
                }
            } catch (error) {
                console.error('Errore nel caricamento della ricetta:', error);
                setError('Errore nel caricamento della ricetta');
            } finally {
                setLoading(false);
            }
        };

        fetchMealDetail();
    }, [mealId]);

    return {
        meal,
        loading,
        error
    };
}

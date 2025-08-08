import api from '../../../lib/axios.js';

// Cerca pasto per nome
export async function searchMealByName(name) {
    try {
        const response = await api.get(`${import.meta.env.VITE_MEALDB_URL}/search?s=${name}`);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response?.data?.message || 'Errore ricerca per nome' };
    }
}

// Cerca pasti che iniziano con una lettera specifica
export async function searchMealByLetter(letter) {
    try {
        const response = await api.get(`${import.meta.env.VITE_MEALDB_URL}/search-by-letter?f=${letter}`);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response?.data?.message || 'Errore ricerca per lettera' };
    }
}

// Ottieni dettagli di un pasto tramite ID
export async function lookupMealById(id) {
    try {
        const response = await api.get(`${import.meta.env.VITE_MEALDB_URL}/lookup?i=${id}`);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response?.data?.message || 'Errore ricerca per ID' };
    }
}

// Restituisce un pasto casuale
export async function getRandomMeal() {
    try {
        const response = await api.get(`${import.meta.env.VITE_MEALDB_URL}/random`);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response?.data?.message || 'Errore pasto casuale' };
    }
}

// Elenca tutte le categorie disponibili
export async function getMealCategories() {
    try {
        const response = await api.get(`${import.meta.env.VITE_MEALDB_URL}/categories`);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response?.data?.message || 'Errore categorie' };
    }
}

// Elenca categorie (c), aree (a) o ingredienti (i)
export async function getMealList(type) {
    try {
        const response = await api.get(`${import.meta.env.VITE_MEALDB_URL}/list?type=${type}`);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response?.data?.message || 'Errore lista' };
    }
}

// Filtra pasti per ingrediente
export async function filterMealByIngredient(ingredient) {
    try {
        const response = await api.get(`${import.meta.env.VITE_MEALDB_URL}/filter-by-ingredient?i=${ingredient}`);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response?.data?.message || 'Errore filtro ingrediente' };
    }
}

// Filtra pasti per categoria
export async function filterMealByCategory(category) {
    try {
        const response = await api.get(`${import.meta.env.VITE_MEALDB_URL}/filter-by-category?c=${category}`);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response?.data?.message || 'Errore filtro categoria' };
    }
}

// Filtra pasti per area geografica
export async function filterMealByArea(area) {
    try {
        const response = await api.get(`${import.meta.env.VITE_MEALDB_URL}/filter-by-area?a=${area}`);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response?.data?.message || 'Errore filtro area' };
    }
}


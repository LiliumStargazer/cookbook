import api from '../../../lib/axios.js';

// Crea una nuova ricetta
export async function createRecipe(data) {
    try {
        const response = await api.post(`${import.meta.env.VITE_RECIPE_URL}`, data);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response?.data?.message || 'Errore creazione ricetta' };
    }
}

// Ottieni tutte le ricette dell'utente
export async function getUserRecipes() {
    try {
        const response = await api.get(`${import.meta.env.VITE_RECIPE_URL}`);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response?.data?.message || 'Errore caricamento ricette' };
    }
}

// Cancella una ricetta tramite id
export async function deleteRecipe(id) {
    try {
        await api.delete(`${import.meta.env.VITE_RECIPE_URL}/${id}`);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.response?.data?.message || 'Errore cancellazione ricetta' };
    }
}


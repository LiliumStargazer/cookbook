import api from '../../../lib/axios.js';

// Ottieni tutte le ricette dell'utente
export async function getUserRecipes() {
  try {
    const response = await api.get(`${import.meta.env.VITE_RECIPE_URL}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || 'Errore caricamento ricette' };
  }
}

// Aggiungi o aggiorna una nota per una ricetta
export async function updateRecipeNote(recipeId, note) {
  try {
    const response = await api.put(`${import.meta.env.VITE_RECIPE_URL}/${recipeId}/note`, { note });
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data || "Errore nell'aggiornamento della nota",
    };
  }
}

// Rimuovi una nota da una ricetta
export async function removeRecipeNote(recipeId) {
  try {
    const response = await api.delete(`${import.meta.env.VITE_RECIPE_URL}/${recipeId}/note`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || 'Errore nella rimozione della nota' };
  }
}

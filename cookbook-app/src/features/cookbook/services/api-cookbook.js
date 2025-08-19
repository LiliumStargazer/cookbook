import api from '../../../lib/axios.js';

// Get all user recipes
export async function getUserRecipes() {
  try {
    const response = await api.get(`${import.meta.env.VITE_RECIPE_URL}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data?.error || 'Error loading recipes' };
  }
}

// Add or update a note for a recipe
export async function updateRecipeNote(recipeId, note) {
  try {
    const response = await api.patch(`${import.meta.env.VITE_RECIPE_URL}/${recipeId}/note`, {
      note,
    });
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Error updating note',
    };
  }
}

// Remove a note from a recipe
export async function removeRecipeNote(recipeId) {
  try {
    const response = await api.delete(`${import.meta.env.VITE_RECIPE_URL}/${recipeId}/note`);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Error removing note',
    };
  }
}

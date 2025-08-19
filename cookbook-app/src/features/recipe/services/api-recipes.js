import api from '../../../lib/axios.js';

// Create a new recipe
export async function addToCookBook(data) {
  try {
    const response = await api.post(`${import.meta.env.VITE_RECIPE_URL}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data.message || 'Error creating recipe' };
  }
}

// Delete a recipe by id
export async function removeFromCookbook(id) {
  try {
    await api.delete(`${import.meta.env.VITE_RECIPE_URL}/${id}`);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data.message || 'Error deleting recipe',
    };
  }
}

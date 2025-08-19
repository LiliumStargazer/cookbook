// Get meal details by ID
import api from '@/lib/axios.js';

export async function lookupMealById(id) {
  try {
    const response = await api.get(`${import.meta.env.VITE_MEALDB_URL}/lookup?i=${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || 'Error searching by ID' };
  }
}

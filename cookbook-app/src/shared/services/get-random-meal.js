// Returns a random meal
import api from '@/lib/axios.js';

export async function getRandomMeal() {
  try {
    const response = await api.get(`${import.meta.env.VITE_MEALDB_URL}/random`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || 'Error fetching random meal' };
  }
}

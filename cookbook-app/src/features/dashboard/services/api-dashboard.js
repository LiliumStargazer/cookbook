import api from '@/lib/axios.js';

export async function getUsersCount() {
  try {
    const response = await api.get(`${import.meta.env.VITE_AUTH_URL}/count`);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'UnknownError',
      message: error.response?.data?.message || 'Error retrieving user count',
    };
  }
}

export async function getReviewsCount() {
  try {
    const response = await api.get(`${import.meta.env.VITE_REVIEW_URL}/count`);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'UnknownError',
      message: error.response?.data?.message || 'Error retrieving reviews count',
    };
  }
}

export async function getTopRatedMeal() {
  try {
    const response = await api.get(`${import.meta.env.VITE_REVIEW_URL}/top-rated`);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'UnknownError',
      message: error.response?.data?.message || 'Error retrieving top rated meal',
    };
  }
}

export async function getMealsCount() {
  try {
    const response = await api.get(`${import.meta.env.VITE_MEALDB_URL}/count`);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'UnknownError',
      message: error.response?.data?.message || 'Error retrieving recipes count',
    };
  }
}

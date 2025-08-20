import api from '../../../lib/axios.js';

// Create a new review
export async function addReview(data) {
  try {
    const response = await api.post(`${import.meta.env.VITE_REVIEW_URL}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'UnknownError',
      message: error.response?.data?.message || 'Error creating review',
    };
  }
}

// Get all reviews for a recipe by idMeal
export async function getReviews(idMeal) {
  try {
    const response = await api.get(`${import.meta.env.VITE_REVIEW_URL}/${idMeal}`);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'UnknownError',
      message: error.response?.data?.message || 'Error loading reviews',
    };
  }
}

export async function deleteReview(id) {
  try {
    const response = await api.delete(`${import.meta.env.VITE_REVIEW_URL}/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'UnknownError',
      message: error.response?.data?.message || 'Error deleting review',
    };
  }
}

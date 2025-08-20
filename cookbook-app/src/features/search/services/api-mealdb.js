import api from '../../../lib/axios.js';

// Search meal by name
export async function searchMealByName(name) {
  try {
    const response = await api.get(`${import.meta.env.VITE_MEALDB_URL}/search-by-name?s=${name}`);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'UnknownError',
      message: error.response?.data?.message || 'Error searching by name',
    };
  }
}

// Search meals that start with a specific letter
export async function searchMealByLetter(letter) {
  try {
    const response = await api.get(
      `${import.meta.env.VITE_MEALDB_URL}/search-by-letter?f=${letter}`,
    );
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'UnknownError',
      message: error.response?.data?.message || 'Error searching by letter',
    };
  }
}

// List all available categories
export async function getMealCategories() {
  try {
    const response = await api.get(`${import.meta.env.VITE_MEALDB_URL}/categories`);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'UnknownError',
      message: error.response?.data?.message || 'Error loading categories',
    };
  }
}

// List categories (c), areas (a) or ingredients (i)
export async function getMealList(type) {
  try {
    const response = await api.get(`${import.meta.env.VITE_MEALDB_URL}/list?type=${type}`);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'UnknownError',
      message: error.response?.data?.message || 'Error loading list',
    };
  }
}

// Filter meals by ingredient
export async function filterMealByIngredient(ingredient) {
  try {
    const response = await api.get(
      `${import.meta.env.VITE_MEALDB_URL}/filter-by-ingredient?i=${ingredient}`,
    );
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'UnknownError',
      message: error.response?.data?.message || 'Error filtering by ingredient',
    };
  }
}

// Filter meals by category
export async function filterMealByCategory(category) {
  try {
    const response = await api.get(
      `${import.meta.env.VITE_MEALDB_URL}/filter-by-category?c=${category}`,
    );
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'UnknownError',
      message: error.response?.data?.message || 'Error filtering by category',
    };
  }
}

// Filter meals by area
export async function filterMealByArea(area) {
  try {
    const response = await api.get(`${import.meta.env.VITE_MEALDB_URL}/filter-by-area?a=${area}`);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'UnknownError',
      message: error.response?.data?.message || 'Error filtering by area',
    };
  }
}

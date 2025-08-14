import api from '../../../lib/axios.js';

// Crea una nuova recensione
export async function addReview(data) {
  try {
    console.log('sono data', data);
    const response = await api.post(`${import.meta.env.VITE_REVIEW_URL}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Errore creazione recensione',
    };
  }
}

// Ottieni tutte le recensioni di una ricetta tramite idMeal
export async function getReviews(idMeal) {
  try {
    const response = await api.get(`${import.meta.env.VITE_REVIEW_URL}/${idMeal}`);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Errore caricamento recensioni',
    };
  }
}

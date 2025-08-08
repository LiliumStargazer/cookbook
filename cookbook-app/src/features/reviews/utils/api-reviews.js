import api from '../../../lib/axios.js';

// Crea una nuova recensione
export async function createReview(data) {
    try {
        const response = await api.post(`${import.meta.env.VITE_REVIEW_URL}`, data);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response?.data?.message || 'Errore creazione recensione' };
    }
}

// Ottieni tutte le recensioni di una ricetta tramite idMeal
export async function getMealReviews(idMeal) {
    try {
        const response = await api.get(`${import.meta.env.VITE_REVIEW_URL}/meal/${idMeal}`);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response?.data?.message || 'Errore caricamento recensioni' };
    }
}

// Cancella una recensione tramite id
export async function deleteReview(id) {
    try {
        await api.delete(`${import.meta.env.VITE_REVIEW_URL}/${id}`);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.response?.data?.message || 'Errore cancellazione recensione' };
    }
}


import api from '../../../lib/axios.js';

export const updateUser = async (userData) => {
    try {
        const response = await api.put(`${import.meta.env.VITE_AUTH_URL}/user`, userData);
        return { success: true, data: response.data };
    } catch (error) {
        console.log(error);
        console.log(error.response?.data);
        return {
            success: false,
            error: error.response?.data || error.response?.data?.message || 'Errore durante l\'aggiornamento del profilo'
        };
    }
};

export const deleteUser = async () => {
    try {
        const response = await api.delete(`${import.meta.env.VITE_AUTH_URL}/user`);
        return { success: true, data: response.data };
    } catch (error) {
        console.log(error.response?.data);
        return {
            success: false,
            error: error.response?.data || error.response?.data?.message || 'Errore durante l\'eliminazione dell\'account'
        };
    }
};


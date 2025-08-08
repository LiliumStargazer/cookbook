import api from '../../../lib/axios.js';
import useAuth from '../../../lib/store.js';

export async function registerUser(userData) {
    try {
        const response = await api.post(`${import.meta.env.VITE_AUTH_URL}/register`, userData);
        return { success: true, data: response.data };
    } catch (error) {
        console.log(error.response?.data);
        return { success: false, error: error.response?.data || 'Errore di registrazione' };
    }
}

export async function loginUser(userData) {
    try {
        const response = await api.post(`${import.meta.env.VITE_AUTH_URL}/login`, userData);
        const { token, user } = response.data;
        useAuth.getState().login(token, user);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.response?.data?.message || 'Errore di autenticazione' };
    }
}

export async function updateUser(data) {
    try {
        const response = await api.put(`${import.meta.env.VITE_AUTH_URL}/api/user`, data);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response?.data?.message || 'Errore aggiornamento utente' };
    }
}

export async function deleteUser() {
    try {
        await api.delete(`${import.meta.env.VITE_AUTH_URL}/api/user`);
        useAuth.getState().logout();
        return { success: true };
    } catch (error) {
        return { success: false, error: error.response?.data?.message || 'Errore cancellazione utente' };
    }
}


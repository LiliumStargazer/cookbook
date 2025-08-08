import api from '../../../lib/axios.js';
import useAuth from '../../../lib/store.js';

export async function registerUser(registrationData) {
    try {
        const response = await api.post(`${import.meta.env.VITE_AUTH_URL}/register`, registrationData);
        return { success: true, data: response.data };
    } catch (error) {
        console.log(error.response?.data);
        return { success: false, error: error.response?.data || 'Errore di registrazione' };
    }
}

export async function loginUser(loginCredentials) {
    try {
        const response = await api.post(`${import.meta.env.VITE_AUTH_URL}/login`, loginCredentials);
        const { token, userData } = response.data;
        console.log('Login response:', response.data);

        // Salva il token e i dati utente nello store globale
        useAuth.getState().login(token, userData);
        return { success: true };
    } catch (error) {
        console.error('ERROR', error);
        return { success: false, error: error.response?.data?.message || 'Errore di autenticazione' };
    }
}



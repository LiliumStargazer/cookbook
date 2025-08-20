import api from '../../../lib/axios.js';
import useAuth from '../../../lib/store.js';

export async function registerUser(registrationData) {
  try {
    const response = await api.post(`${import.meta.env.VITE_AUTH_URL}/register`, registrationData);
    return { success: true, data: response.data };
  } catch (error) {
    console.log(error.response?.data);
    return {
      success: false,
      error: error.response?.data?.error || 'UnknownError',
      message: error.response?.data?.message || 'Registration failed',
    };
  }
}

export async function loginUser(loginCredentials) {
  try {
    const response = await api.post(`${import.meta.env.VITE_AUTH_URL}/login`, loginCredentials);
    const { token, userData } = response.data;
    useAuth.getState().login(token, userData); // Salva token e dati utente nello store globale
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'UnknownError',
      message: error.response?.data?.message || 'Authentication error',
    };
  }
}

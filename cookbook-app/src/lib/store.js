// src/features/auth/store.js
import { create } from 'zustand';

const useAuth = create((set, get) => ({
    token: null,
    userData: null,

    login: (token, userData) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        set({ token, userData });
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ token: null, userData: null });
    },

    updateUser: (userData) => {
        const currentUserData = get().userData;
        const updatedUserData = { ...currentUserData, ...userData };

        localStorage.setItem('user', JSON.stringify(updatedUserData));
        set({ userData: updatedUserData });
    },

    loadFromStorage: () => {
        const token = localStorage.getItem('token');
        const userString = localStorage.getItem('user');

        if (token && userString) {
            try {
                const userData = JSON.parse(userString);
                set({ token, userData });
            } catch (error) {
                console.error('Errore nel parsing dei dati utente:', error);
                // Se c'è un errore, pulisci il localStorage
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        } else if (token) {
            set({ token });
        }
    },
}));

export default useAuth;
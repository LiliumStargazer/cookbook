// src/features/auth/store.js
import { create } from 'zustand';

const useAuth = create((set, get) => ({
    token: null,
    user: null,

    login: (token, user) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        set({ token, user });
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ token: null, user: null });
    },

    // Nuova funzione per recuperare i dati utente dal backend
    fetchUserData: async () => {
        const { token } = get();
        if (!token) return;

        try {
            const response = await fetch('/api/auth/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const user = await response.json();
                localStorage.setItem('user', JSON.stringify(user));
                set({ user });
            }
        } catch (error) {
            console.error('Errore nel recuperare i dati utente:', error);
        }
    },

    loadFromStorage: () => {
        const token = localStorage.getItem('token');
        const userString = localStorage.getItem('user');

        if (token && userString) {
            try {
                const user = JSON.parse(userString);
                set({ token, user });
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
import { Navigate } from 'react-router-dom';
import useAuth from '../lib/store.js';

export default function RequireGuest({ children }) {
    const token = useAuth((s) => s.token);

    // Se l'utente è già loggato, reindirizza al dashboard
    if (token) {
        return <Navigate to="/" replace />;
    }

    // Se non è loggato, mostra la pagina (signin/signup)
    return children;
}

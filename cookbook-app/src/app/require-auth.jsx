import { Navigate } from 'react-router-dom';
import useAuth from '../lib/store.js';

export default function RequireAuth({ children }) {
    const token = useAuth((s) => s.token);

    if (!token) {
        return <Navigate to="/signin" replace />;
    }

    return children;
}
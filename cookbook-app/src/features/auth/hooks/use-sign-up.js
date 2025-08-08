import { useState } from 'react';
import { registerUser } from '../utils/api-auth.js';
import { useNavigate } from 'react-router-dom';

export default function useSignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [favoriteDishes, setFavoriteDishes] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleFavoriteDishesChange = (e) => setFavoriteDishes(e.target.value);

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        // favoriteDishes come array di stringhe
        const dishesArray = favoriteDishes
            .split(',')
            .map(d => d.trim())
            .filter(d => d.length > 0);
        const result = await registerUser({ username, email, password, favoriteDishes: dishesArray });
        setLoading(false);
        if (result.success) {
            setSuccess('Registrazione avvenuta con successo!Ti reindirizzo alla pagina di login');
            setTimeout(() => {
                navigate('/signin');
                // workaround Ricarica la pagina dopo il redirect, altrimenti fallisce il login perchè non trova il token
                window.location.reload();
            }, 2500);
        } else {
            setError(result.error);
        }
    };

    return {
        username,
        email,
        password,
        favoriteDishes,
        error,
        success,
        loading,
        handleUsernameChange,
        handleEmailChange,
        handlePasswordChange,
        handleFavoriteDishesChange,
        handleSubmit,
    };
}


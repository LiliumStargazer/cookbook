import { useState } from 'react';
import { loginUser } from '../utils/api-auth.js';
import { useNavigate } from 'react-router-dom';

export default function useSignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        const result = await loginUser({ email, password });
        console.log('sono result',result);
        setLoading(false);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.error);
        }
    };

    const handleSignUp = () => {
        navigate('/signup');
    };

    return {
        email,
        password,
        error,
        loading,
        handleEmailChange,
        handlePasswordChange,
        handleSubmit,
        handleSignUp,
    };
}

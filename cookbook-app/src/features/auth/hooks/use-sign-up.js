import { useState, useCallback } from 'react';
import { registerUser } from '@/features/auth/services/api-auth.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function useSignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [favoriteDishes, setFavoriteDishes] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = useCallback(e => setUsername(e.target.value), []);
  const handleEmailChange = useCallback(e => setEmail(e.target.value), []);
  const handlePasswordChange = useCallback(e => setPassword(e.target.value), []);
  const handleFavoriteDishesChange = useCallback(e => setFavoriteDishes(e.target.value), []);

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      const dishesArray = favoriteDishes
        .split(',')
        .map(d => d.trim())
        .filter(d => d.length > 0);
      const result = await registerUser({ username, email, password, favoriteDishes: dishesArray });
      setLoading(false);
      if (result.success) {
        toast.success('Registrazione avvenuta con successo!Ti reindirizzo alla pagina di login');
        setTimeout(() => {
          navigate('/signin');
          window.location.reload();
        }, 2500);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [username, email, password, favoriteDishes, navigate]);

  return {
    username,
    email,
    password,
    favoriteDishes,
    loading,
    handleUsernameChange,
    handleEmailChange,
    handlePasswordChange,
    handleFavoriteDishesChange,
    handleSubmit,
  };
}

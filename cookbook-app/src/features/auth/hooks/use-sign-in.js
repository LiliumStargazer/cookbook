import { useState, useCallback } from 'react';
import { loginUser } from '@/features/auth/services/api-auth.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function useSignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = useCallback(e => setEmail(e.target.value), []);
  const handlePasswordChange = useCallback(e => setPassword(e.target.value), []);

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      const result = await loginUser({ email, password });
      if (result.success) {
        navigate('/');
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [email, password, navigate]);

  const handleSignUp = useCallback(() => {
    navigate('/signup');
  }, [navigate]);

  return {
    email,
    password,
    loading,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    handleSignUp,
  };
}

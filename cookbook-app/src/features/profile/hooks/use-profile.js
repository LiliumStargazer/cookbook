import { useState } from 'react';
import useAuth from '@/lib/store.js';
import { updateUser } from '@/features/profile/services/api-profile.js';
import { toast } from 'sonner';

export function useProfile() {
  const { userData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(userData?.username);
  const [email, setEmail] = useState(userData?.email);
  const [password, setPassword] = useState('*****');
  const [isEditing, setIsEditing] = useState(false);
  const [favoriteDishes, setFavoriteDishes] = useState(
    Array.isArray(userData?.favoriteDishes)
      ? userData.favoriteDishes.join(', ')
      : userData?.favoriteDishes || '',
  );

  const handleUsernameChange = e => setUsername(e.target.value);
  const handleEmailChange = e => setEmail(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);
  const handlePasswordKeyDown = e => {
    // If the field contains asterisks and the user presses Backspace, clear everything
    if (e.key === 'Backspace' && password.includes('*')) {
      e.preventDefault();
      setPassword('');
    }
  };
  const handleFavoriteDishesChange = e => setFavoriteDishes(e.target.value);

  const handleSave = async e => {
    if (e) e.preventDefault();
    setLoading(true);

    try {
      // Create the data object without the password if it's fake
      const updateData = {
        username,
        email,
        favoriteDishes:
          typeof favoriteDishes === 'string'
            ? favoriteDishes
                .split(',')
                .map(dish => dish.trim())
                .filter(dish => dish !== '')
            : Array.isArray(favoriteDishes)
              ? favoriteDishes
              : [],
      };
      // Consider password valid only if it does not contain asterisks and has at least 6 characters
      // Add the password only if it has actually been changed
      if (password && !password.includes('*') && password.trim() !== '')
        updateData.password = password;

      const response = await updateUser(updateData);

      if (response.success) {
        toast.success('Update successful!');
        setPassword('*****'); // Reset password after update
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      // Network errors, timeout, server unreachable, etc.
      toast.error(error.message);
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    // Restore original data
    setUsername(userData?.username);
    setEmail(userData?.email);
    setPassword('*****');
    setFavoriteDishes(userData?.favoriteDishes);
    setIsEditing(false);
  };

  const startEditing = e => {
    if (e) e.preventDefault();
    setIsEditing(true);
  };

  return {
    loading,
    username,
    email,
    password,
    favoriteDishes,
    isEditing,
    handleSave,
    handleCancel,
    handleUsernameChange,
    handleEmailChange,
    handlePasswordChange,
    handlePasswordKeyDown,
    handleFavoriteDishesChange,
    startEditing,
  };
}

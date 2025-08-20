import { useState, useEffect } from 'react';
import { getUsersCount } from '@/features/dashboard/services/api-dashboard.js';
import { toast } from 'sonner';

export function useUsersCount() {
  const [loading, setLoading] = useState(false);
  const [usersCount, setUsersCount] = useState(null);
  const [error, setError] = useState(null);

  const fetchUsersCount = async () => {
    setLoading(true);
    try {
      const response = await getUsersCount();
      if (response.success) {
        setUsersCount(response.data.count);
      } else {
        setError(true);
        toast.error(response.message);
      }
    } catch (error) {
      setError(true);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchUsersCount();
    })();
  }, []);

  return { loadingUsers: loading, usersCount, errorUsersCount: error };
}

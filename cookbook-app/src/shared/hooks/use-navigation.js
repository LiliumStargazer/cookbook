import { useMemo } from 'react';

export function useNavigation() {
  const menuItems = useMemo(
    () => [
      { label: 'Home', to: '/' },
      { label: 'Search', to: '/search' },
      { label: 'My Recipes', to: '/cookbook' },
      { label: 'Profile', to: '/profile' },
    ],
    [],
  );

  return { menuItems };
}

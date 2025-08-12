import { useMemo } from 'react';

export function useNavigation() {
  // Qui puoi aggiungere logica per determinare i menu items
  // basata su contesto utente, pagina corrente, ecc.

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

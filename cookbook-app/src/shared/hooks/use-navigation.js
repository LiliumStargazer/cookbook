import { useMemo } from 'react'

export function useNavigation() {
    // Qui puoi aggiungere logica per determinare i menu items
    // basata su contesto utente, pagina corrente, ecc.

    const menuItems = useMemo(() => [
        { label: 'Home', to: '/' },
        { label: 'Recipes', to: '/recipes' },
        { label: 'Profile', to: '/profile' },
        { label: 'Impostazioni', to: '/settings' }
    ], [])

    return { menuItems }
}

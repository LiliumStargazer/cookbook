import { useMemo } from 'react'
import useAuth from '@/lib/store.js'

export function useCurrentUser() {
    const { user, token } = useAuth();

    const userName = useMemo(() => {
        if (!user) return null
        return user.name || user.username || user?.firstName || user.email?.split('@')[0] || 'Utente'
    }, [user])

    const isAuthenticated = useMemo(() => {
        return !!token && !!user
    }, [token, user])

    const fullName = useMemo(() => {
        if (!user) return null
        if (user?.firstName && user?.lastName) {
            return `${user.firstName} ${user.lastName}`
        }
        return userName
    }, [user, userName])

    return {
        userName,
        user,
        isAuthenticated,
        email: user?.email,
        fullName
    }
}

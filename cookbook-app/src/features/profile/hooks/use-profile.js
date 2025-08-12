import { useState } from 'react';
import useAuth from "@/lib/store.js";
import {updateUser} from "@/features/profile/services/api-profile.js";
import { toast } from "sonner";

export function useProfile() {
    const { userData } = useAuth();
    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState(userData?.username );
    const [email, setEmail] = useState(userData?.email);
    const [password, setPassword] = useState('*****');
    const [favoriteDishes, setFavoriteDishes] = useState(
        Array.isArray(userData?.favoriteDishes)
            ? userData.favoriteDishes.join(', ')
            : userData?.favoriteDishes || ''
    );

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);

    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handlePasswordKeyDown = (e) => {
        // Se il campo contiene asterischi e l'utente preme Backspace, cancella tutto
        if (e.key === 'Backspace' && password.includes('*')) {
            e.preventDefault();
            setPassword('');
        }
    };

    const handleFavoriteDishesChange = (e) => setFavoriteDishes(e.target.value);

    const [isEditing, setIsEditing] = useState(false);

    const handleSave = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);

        try {
            // Crea l'oggetto dati senza la password se è fittizia
            const updateData = {
                username,
                email,
                favoriteDishes: typeof favoriteDishes === 'string'
                    ? favoriteDishes.split(',').map(dish => dish.trim()).filter(dish => dish !== '')
                    : Array.isArray(favoriteDishes)
                        ? favoriteDishes
                        : []
            };

            // Aggiungi la password solo se è stata realmente modificata
            // Considera password valida solo se non contiene asterischi e ha almeno 6 caratteri
            if (password && !password.includes('*') && password.trim() !== '' )
                updateData.password = password;

            const result = await updateUser(updateData);

            if (result.success) {
                toast.success('Aggiornamento avvenuto con successo!');
                setPassword('*****'); // Resetta la password dopo l'aggiornamento
            } else {
                console.log('Update error:', result);
                toast.error(result.error || 'Errore durante l\'aggiornamento');
            }
        } catch (error) {
            // Errori di rete, timeout, server non raggiungibile, ecc.
            console.error('Network/Runtime error:', error);
            toast.error('Errore di connessione. Riprova più tardi.');
        } finally {
            setLoading(false);
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        // Ripristina i dati originali
        setUsername(userData?.username);
        setEmail(userData?.email);
        setPassword('*****');
        setFavoriteDishes(userData?.favoriteDishes);
        setIsEditing(false);
    };

    const startEditing = (e) => {
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
        startEditing
    };
}

import { useState, useEffect } from 'react';
import useAuth from "@/lib/store.js";

export function useProfile() {
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        username: user?.username || '',
        favoriteDishes: user?.favoriteDishes || ''
    });

    const [isEditing, setIsEditing] = useState(false);

    // Aggiorna formData quando user cambia
    useEffect(() => {
        setFormData({
            name: user?.name || '',
            email: user?.email || '',
            username: user?.username || '',
            favoriteDishes: user?.favoriteDishes || ''
        });
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        // TODO: Implementare salvataggio dati utente
        console.log('Salvataggio dati:', formData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        // Ripristina i dati originali
        setFormData({
            name: user?.name || '',
            email: user?.email || '',
            username: user?.username || '',
            favoriteDishes: user?.favoriteDishes || ''
        });
        setIsEditing(false);
    };

    const startEditing = () => {
        setIsEditing(true);
    };

    return {
        user,
        formData,
        isEditing,
        handleInputChange,
        handleSave,
        handleCancel,
        startEditing
    };
}


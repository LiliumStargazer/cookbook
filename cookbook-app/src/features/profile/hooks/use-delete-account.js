import { useState } from 'react';
import { toast } from "sonner";
import useAuth from "@/lib/store.js";
import { useNavigate } from 'react-router-dom';
import {deleteUser} from "@/features/profile/utils/api-profile.js";

export function useDeleteAccount() {
    const [loading, setLoading] = useState(false);
    const { userData, logout } = useAuth();
    const navigate = useNavigate();

    const handleDeleteAccount = async () => {
        setLoading(true);
        try {
            const result = await deleteUser(userData);
            console.log(result);
            if (result.success) {
                toast.success('Account eliminato con successo');
                logout();
                navigate('/auth/login');
            }else{
                toast.error(result.error || 'Errore durante l\'eliminazione dell\'account');
            }
        } catch (error) {
            console.error('Network/Runtime error:', error);
            toast.error('Errore di connessione. Riprova più tardi.');
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        handleDeleteAccount
    };
}

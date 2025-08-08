import useAuth from '../lib/store.js';
import { useEffect } from 'react';
import AppRoutes from "./routes.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from "@/components/ui/sonner";

function App() {
    const loadFromStorage = useAuth((s) => s.loadFromStorage);

    useEffect(() => {
        loadFromStorage();  // ripristina il token salvato (es. da localStorage)
    }, [loadFromStorage]);

    return (
        <>
            <AppRoutes />
            <Toaster />
        </>
    );
}

export default App;
import useAuth from '../lib/store.js';
import { useEffect } from 'react';
import AppRoutes from "./routes.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const loadFromStorage = useAuth((s) => s.loadFromStorage);

    useEffect(() => {
        loadFromStorage();  // ripristina il token salvato (es. da localStorage)
    }, [loadFromStorage]);

    return <AppRoutes />;
}

export default App;
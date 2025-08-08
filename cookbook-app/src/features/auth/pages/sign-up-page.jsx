import React from "react";
import useSignUp from "../hooks/use-sign-up";
import AuthForm from '../components/auth-form.jsx';
import AuthBackground from '../components/auth-background.jsx';
import AuthCard from "../components/auth-card.jsx";
import AuthPromo from '../components/auth-promo.jsx';

export default function SignUpPage() {
    const {
        username,
        email,
        password,
        favoriteDishes,
        loading,
        handleUsernameChange,
        handleEmailChange,
        handlePasswordChange,
        handleFavoriteDishesChange,
        handleSubmit,
    } = useSignUp();

    return (
        <div className="min-vh-100 vw-100 d-flex flex-row align-items-stretch" style={{ background: '#fff' }}>
            {/* Colonna sinistra: immagine, metà pagina */}
            <AuthBackground
                className="d-flex  justify-content-center align-items-start overflow-hidden"
            >
                <AuthPromo />
            </AuthBackground>
            {/* Colonna destra: card di registrazione su sfondo bianco, metà pagina */}
            <div className="d-flex flex-column align-items-center justify-content-center" style={{ width: '50vw', minWidth: '50vw', maxWidth: '50vw', background: '#fff', minHeight: '100vh' }}>
                <AuthCard
                    title="CookBook"
                    description="Registrazione"
                    image="/src/assets/recipe.png"
                    buttonText="Registrati"
                    buttonVariant="primary"
                >
                    <AuthForm
                        fields={[
                            {
                                id: 'username',
                                label: 'Username',
                                type: 'text',
                                placeholder: 'Inserisci username',
                                value: username,
                                onChange: handleUsernameChange,
                                required: true,
                                autoFocus: true,
                            },
                            {
                                id: 'email',
                                label: 'Email',
                                type: 'email',
                                placeholder: 'Inserisci la tua email',
                                value: email,
                                onChange: handleEmailChange,
                                required: true,
                            },
                            {
                                id: 'password',
                                label: 'Password',
                                type: 'password',
                                placeholder: 'Inserisci la password',
                                value: password,
                                onChange: handlePasswordChange,
                                required: true,
                            },
                            {
                                id: 'favoriteDishes',
                                label: 'Piatti preferiti (separati da virgola)',
                                type: 'text',
                                placeholder: 'Es: Pizza, Pasta, Sushi',
                                value: favoriteDishes,
                                onChange: handleFavoriteDishesChange,
                                required: false,
                            },
                        ]}
                        onSubmit={handleSubmit}
                        loading={loading}
                        buttonText="Registrati"
                    />
                </AuthCard>
            </div>
        </div>
    );
}

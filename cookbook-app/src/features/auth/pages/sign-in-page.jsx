import AuthCard from '../components/auth-card.jsx';
import AuthBackground from '../components/auth-background.jsx';
import AuthForm from '../components/auth-form.jsx';
import useSignIn from '../hooks/use-sign-in.js';

function SignInPage() {
  const {
    email,
    password,
    loading,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    handleSignUp,
  } = useSignIn();
  return (
    <AuthBackground
      className='d-flex flex-column align-items-center justify-content-center'
      style={{
        width: '100vw',
        minWidth: '100vw',
        maxWidth: '100vw',
        color: '#fff',
        textShadow: '0 2px 8px rgba(0,0,0,0.3)',
      }}
    >
      <AuthCard
        title='CookBook'
        description='Accedi al tuo account CookBook'
        image='/src/assets/recipe.png'
        buttonText='Login'
        buttonVariant='primary'
        action={
          <button className='btn btn-link' onClick={handleSignUp}>
            Sign Up
          </button>
        }
      >
        <AuthForm
          fields={[
            {
              id: 'email',
              label: 'Email',
              type: 'email',
              placeholder: 'Inserisci la tua email',
              value: email,
              onChange: handleEmailChange,
              required: true,
              autoFocus: true,
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
          ]}
          onSubmit={handleSubmit}
          loading={loading}
          buttonText='Login'
        />
      </AuthCard>
    </AuthBackground>
  );
}

export default SignInPage;

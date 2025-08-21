import AuthCard from '../components/auth-card.jsx';
import AuthBackground from '../components/auth-background.jsx';
import AuthForm from '../components/auth-form.jsx';
import useSignIn from '../hooks/use-sign-in.js';
import AuthPromo from '@/features/auth/components/auth-promo.jsx';

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
    <AuthBackground className='relative min-h-screen flex flex-col justify-center items-center'>
      <div className='flex flex-row items-center justify-center w-full h-full '>
        <div className='mb-120'>
          <AuthPromo
            title={'Sign in to CookBook'}
            description={
              'Access your favorite recipes, share new ideas, and keep exploring the world of cooking with our community!'
            }
            titleClassName={'!text-destructive text-shadow-white'}
            descriptionClassName={'text-white text-shadow-black'}
          />
        </div>
        <AuthCard
          title='CookBook'
          description='Accedi al tuo account CookBook'
          image='/src/assets/recipe.png'
          buttonText='Login'
          buttonVariant='primary'
          action={
            <button
              className='!text-destructive text-shadow-white btn btn-link '
              onClick={handleSignUp}
            >
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
      </div>
    </AuthBackground>
  );
}

export default SignInPage;

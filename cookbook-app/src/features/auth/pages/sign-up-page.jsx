import useSignUp from '../hooks/use-sign-up';
import AuthForm from '../components/auth-form.jsx';
import AuthCard from '../components/auth-card.jsx';
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
    <div className='min-h-screen flex flex-col md:flex-row'>
      {/* Colonna sinistra: promo con gradiente */}
      <div className='md:w-1/2 flex items-center justify-center bg-gradient-to-br from-white to-blue-200'>
        <AuthPromo
          title={'Create your CookBook account'}
          description={
            'Join the community of cooking enthusiasts!\nShare your favorite recipes, save your beloved dishes, and discover new flavors every day.'
          }
          titleClassName={'!text-destructive '}
          descriptionClassName={'text-black'}
        />
      </div>
      {/* Colonna destra: card di registrazione */}
      <div className='md:w-1/2 flex items-center justify-center bg-white max-h-screen overflow-y-auto'>
        <AuthCard
          title='CookBook'
          description='Sign Up'
          image='/src/assets/recipe.png'
          buttonText='Sign Up'
          buttonVariant='primary'
        >
          <AuthForm
            fields={[
              {
                id: 'username',
                label: 'Username',
                type: 'text',
                placeholder: 'Enter username',
                value: username,
                onChange: handleUsernameChange,
                required: true,
                autoFocus: true,
              },
              {
                id: 'email',
                label: 'Email',
                type: 'email',
                placeholder: 'Enter your email',
                value: email,
                onChange: handleEmailChange,
                required: true,
              },
              {
                id: 'password',
                label: 'Password',
                type: 'password',
                placeholder: 'Enter password',
                value: password,
                onChange: handlePasswordChange,
                required: true,
              },
              {
                id: 'favoriteDishes',
                label: 'Favorite dishes (comma separated)',
                type: 'text',
                placeholder: 'E.g.: Pizza, Pasta, Sushi',
                value: favoriteDishes,
                onChange: handleFavoriteDishesChange,
                required: false,
              },
            ]}
            onSubmit={handleSubmit}
            loading={loading}
            buttonText='Sign Up'
          />
        </AuthCard>
      </div>
    </div>
  );
}

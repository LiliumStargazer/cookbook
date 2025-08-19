import NavBar from '@/shared/components/navbar.jsx';
import ProfileCard from '@/features/profile/components/profile-card.jsx';
import ProfileForm from '@/features/profile/components/profile-form.jsx';
import DangerZoneCard from '@/features/profile/components/danger-zone-card.jsx';
import { useProfile } from '@/features/profile/hooks/use-profile.js';
import { useDeleteAccount } from '@/features/profile/hooks/use-delete-account.js';

export default function ProfilePage() {
  const {
    loading,
    username,
    email,
    favoriteDishes,
    password,
    isEditing,
    handleSave,
    handleCancel,
    handleUsernameChange,
    handleEmailChange,
    handlePasswordChange,
    handlePasswordKeyDown,
    handleFavoriteDishesChange,
    startEditing,
  } = useProfile();

  const { handleDeleteAccount, loading: deleteLoading } = useDeleteAccount();

  return (
    <div className='w-full'>
      <NavBar />
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <ProfileCard username={username} onAvatarClick={startEditing}>
            <ProfileForm
              username={username}
              email={email}
              password={password}
              favoriteDishes={favoriteDishes}
              isEditing={isEditing}
              loading={loading}
              onUsernameChange={handleUsernameChange}
              onEmailChange={handleEmailChange}
              onPasswordChange={handlePasswordChange}
              onPasswordKeyDown={handlePasswordKeyDown}
              onFavoriteDishesChange={handleFavoriteDishesChange}
              onSave={handleSave}
              onCancel={handleCancel}
              onStartEditing={startEditing}
            />
          </ProfileCard>
          <DangerZoneCard onDeleteAccount={handleDeleteAccount} loading={deleteLoading} />
        </div>
      </div>
    </div>
  );
}

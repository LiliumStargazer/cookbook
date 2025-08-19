import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';

export default function ProfileForm({
  username,
  email,
  password,
  favoriteDishes,
  isEditing,
  loading,
  onUsernameChange,
  onEmailChange,
  onPasswordChange,
  onPasswordKeyDown,
  onFavoriteDishesChange,
  onSave,
  onCancel,
  onStartEditing,
}) {
  return (
    <form onSubmit={onSave} className='space-y-4'>
      <div className='grid gap-4'>
        <div className='grid gap-2'>
          <Label htmlFor='username'>Username</Label>
          <Input
            id='username'
            name='username'
            value={username}
            onChange={onUsernameChange}
            disabled={!isEditing}
            placeholder='Your username'
          />
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='password'>Password</Label>
          <Input
            id='password'
            name='password'
            type='password'
            value={password}
            onChange={onPasswordChange}
            onKeyDown={onPasswordKeyDown}
            disabled={!isEditing}
            placeholder='Your password'
          />
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            name='email'
            type='email'
            value={email}
            onChange={onEmailChange}
            disabled={!isEditing}
            placeholder='Your email'
            required
          />
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='favoriteDishes'>Favorite dishes</Label>
          <textarea
            id='favoriteDishes'
            name='favoriteDishes'
            value={favoriteDishes}
            onChange={onFavoriteDishesChange}
            disabled={!isEditing}
            placeholder='Your favorite dishes'
            rows={6}
            className='w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none'
          />
        </div>
      </div>

      <div className='flex gap-4 pt-4'>
        {!isEditing ? (
          <Button type='button' onClick={onStartEditing} className='w-full' variant='destructive'>
            Edit Profile
          </Button>
        ) : (
          <>
            <Button type='submit' className='flex-1' variant='destructive' disabled={loading}>
              Save Changes
            </Button>
            <Button
              type='button'
              disabled={loading}
              variant='outline'
              onClick={onCancel}
              className='flex-1'
            >
              Cancel
            </Button>
          </>
        )}
      </div>
    </form>
  );
}

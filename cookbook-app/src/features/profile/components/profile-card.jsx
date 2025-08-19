import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.jsx';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.jsx';

export default function ProfileCard({ username, onAvatarClick, children }) {
  return (
    <Card>
      <CardHeader className='text-center'>
        <div className='flex justify-center mb-4'>
          <Avatar
            className='w-24 h-24 border-4 !border-primary cursor-pointer hover:opacity-80 transition-opacity'
            onClick={onAvatarClick}
          >
            <AvatarImage src='https://github.com/evilrabbit.png' alt={username} />
            <AvatarFallback className='text-2xl'>
              {username?.[0]?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className='text-2xl'>My Profile</CardTitle>
        <CardDescription>Manage your account information</CardDescription>
      </CardHeader>
      <CardContent className='space-y-6 relative'>{children}</CardContent>
    </Card>
  );
}

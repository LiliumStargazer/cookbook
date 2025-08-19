import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';

export default function DeleteAccountDialog({ children, onConfirm, loading = false }) {
  const [confirmText, setConfirmText] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    if (confirmText === 'DELETE') {
      onConfirm();
      setIsOpen(false);
      setConfirmText('');
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    setConfirmText('');
  };

  const isConfirmValid = confirmText === 'DELETE';

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className='max-w-md'>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-red-600'>⚠️ Confirm Account Deletion</AlertDialogTitle>
          <AlertDialogDescription className='space-y-4'>
            <p>
              This action will <strong>permanently</strong> delete your account and all associated
              data:
            </p>
            <ul className='list-disc list-inside space-y-1 text-sm'>
              <li>All your recipes</li>
              <li>Reviews and comments</li>
              <li>Preferences and settings</li>
              <li>Browsing history</li>
            </ul>
            <p className='font-semibold text-red-700'>This operation cannot be undone.</p>
            <div className='mt-4'>
              <Label htmlFor='confirm-delete' className='text-sm font-medium'>
                To confirm, type <span className='font-mono bg-gray-100 px-1 rounded'>DELETE</span>:
              </Label>
              <Input
                id='confirm-delete'
                value={confirmText}
                onChange={e => setConfirmText(e.target.value)}
                placeholder='Type DELETE to confirm'
                className='mt-2'
                autoComplete='off'
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={!isConfirmValid || loading}
            className='bg-red-600 hover:bg-red-700 focus:ring-red-500'
          >
            {loading ? 'Deleting...' : 'Permanently Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

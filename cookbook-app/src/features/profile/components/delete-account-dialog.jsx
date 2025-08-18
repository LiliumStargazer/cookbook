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
    if (confirmText === 'ELIMINA') {
      onConfirm();
      setIsOpen(false);
      setConfirmText('');
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    setConfirmText('');
  };

  const isConfirmValid = confirmText === 'ELIMINA';

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className='max-w-md'>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-red-600'>
            ⚠️ Conferma Eliminazione Account
          </AlertDialogTitle>
          <AlertDialogDescription className='space-y-4'>
            <p>
              Questa azione eliminerà <strong>definitivamente</strong> il tuo account e tutti i dati
              associati:
            </p>
            <ul className='list-disc list-inside space-y-1 text-sm'>
              <li>Tutte le tue ricette</li>
              <li>Recensioni e commenti</li>
              <li>Preferenze e impostazioni</li>
              <li>Cronologia di navigazione</li>
            </ul>
            <p className='font-semibold text-red-700'>
              Questa operazione non può essere annullata.
            </p>
            <div className='mt-4'>
              <Label htmlFor='confirm-delete' className='text-sm font-medium'>
                Per confermare, scrivi{' '}
                <span className='font-mono bg-gray-100 px-1 rounded'>ELIMINA</span>:
              </Label>
              <Input
                id='confirm-delete'
                value={confirmText}
                onChange={e => setConfirmText(e.target.value)}
                placeholder='Scrivi ELIMINA per confermare'
                className='mt-2'
                autoComplete='off'
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Annulla</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={!isConfirmValid || loading}
            className='bg-red-600 hover:bg-red-700 focus:ring-red-500'
          >
            {loading ? 'Eliminazione...' : 'Elimina Definitivamente'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

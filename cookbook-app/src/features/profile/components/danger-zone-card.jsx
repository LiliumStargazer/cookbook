import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import DeleteAccountDialog from './delete-account-dialog.jsx';

export default function DangerZoneCard({ onDeleteAccount, loading = false }) {
  return (
    <Card className='border-red-200 bg-red-50/50 mt-6'>
      <CardHeader>
        <CardTitle className='text-red-600 flex items-center gap-2'>⚠️ Danger Zone</CardTitle>
        <CardDescription className='text-red-700'>
          Actions in this section are irreversible
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col gap-4'>
          <div>
            <h4 className='font-medium text-red-800 mb-2'>Delete Account</h4>
            <p className='text-sm text-red-600 mb-4'>
              Deleting your account will permanently erase all your data, saved recipes, and
              reviews. This action cannot be undone.
            </p>
            <DeleteAccountDialog onConfirm={onDeleteAccount} loading={loading}>
              <Button variant='destructive' className='bg-red-600 hover:bg-red-700'>
                Permanently Delete Account
              </Button>
            </DeleteAccountDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

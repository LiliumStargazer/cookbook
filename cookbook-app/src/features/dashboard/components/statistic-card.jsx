import { Card, CardContent, CardHeader } from '@/components/ui/card.jsx';
import { Skeleton } from '@/components/ui/skeleton.jsx';

export default function StatisticCard({ loading, label, value, error }) {
  return (
    <Card className='w-60'>
      <CardHeader>
        <span className='text-xl font-semibold'>{label}</span>
      </CardHeader>
      <CardContent>
        {error ? (
          <span className='text-red-500'>Error</span>
        ) : loading ? (
          <Skeleton className='h-8 w-20' />
        ) : (
          <span className='text-3xl font-bold'>{value}</span>
        )}
      </CardContent>
    </Card>
  );
}

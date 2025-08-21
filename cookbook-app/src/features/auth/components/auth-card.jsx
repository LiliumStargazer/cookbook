import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function AuthCard({ title, image = null, children, action, ...props }) {
  return (
    <Card
      className='w-full max-w-sm card '
      style={{ background: 'rgba(255,255,255,0.3)' }}
      {...props}
    >
      <CardTitle className='text-2xl text-center w-full'>{title}</CardTitle>
      <CardHeader className='flex items-center gap-2 w-full'>
        <div className='flex-1 flex justify-center items-center'>
          {image && <img src={image} alt='auth' style={{ maxHeight: 80 }} />}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className='flex-col gap-2 '>
        {action && (
          <div className='flex items-end justify-end '>
            <CardAction>{action}</CardAction>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

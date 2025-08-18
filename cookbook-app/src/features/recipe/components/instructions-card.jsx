import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Clock } from 'lucide-react';

export default function InstructionsCard({ instructions }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center'>
          <Clock className='w-5 h-5 mr-2' />
          Istruzioni
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='prose prose-sm max-w-none'>
          {instructions?.split('\n').map((instruction, index) => {
            if (instruction.trim()) {
              return (
                <p key={index} className='mb-3 leading-relaxed'>
                  {instruction.trim()}
                </p>
              );
            }
            return null;
          })}
        </div>
      </CardContent>
    </Card>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import { formatBalance } from '@/lib/utils';

export function ServiceCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Service title</CardTitle>
        <CardDescription>Description</CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <p className='text-sm'>Preço: {formatBalance(1437.239)}</p>
        <p className='text-sm'>Provedor: Tomais Bunga</p>
      </CardContent>
      <CardFooter className='flex justify-between gap-5'>
        <Button>Reservar</Button>
      </CardFooter>
    </Card>
  );
}

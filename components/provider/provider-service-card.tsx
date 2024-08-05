import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import { ServiceUpload } from './service-upload';
import { formatBalance } from '@/lib/utils';

export function ProviderServiceCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Service title</CardTitle>
        <CardDescription>Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p className='text-sm'>Preço: {formatBalance(1437.239)}</p>
      </CardContent>
      <CardFooter className='flex justify-between gap-5'>
        <ServiceUpload saveType='Editar' />
        <Button>Eliminar</Button>
      </CardFooter>
    </Card>
  );
}

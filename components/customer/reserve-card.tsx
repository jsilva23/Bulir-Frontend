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
import { ReservationType } from '@/types/service';
import { Session } from 'next-auth';
import { deleteService } from '@/app/api/services/provider-services';
import { ReserveUpload } from './reserve-upload';
import { cancelReservation } from '@/app/api/services/customer-services';
import { Badge } from '@/components/ui/badge';

type ServiceCardType = {
  reservation: ReservationType;
  session: Session;
  mutate: () => void;
};

export function ReserveCard({ reservation, session, mutate }: ServiceCardType) {
  const selectedDate = new Date(reservation.date);
  const handleCancelReservation = async (serviceId: string) => {
    try {
      await cancelReservation(serviceId, session);
      mutate();
    } catch (erro) {
      console.error('Erro no exemplo de uso:', erro);
    }
  };

  return (
    <Card className='relative'>
      <CardHeader>
        <CardTitle>{reservation.service.name}</CardTitle>
        <CardDescription>{reservation.service.description}</CardDescription>
        {reservation.canceled && (
          <Badge className='absolute right-0 top-0' variant='destructive'>
            Cancelado
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <p className='text-sm'>
          Preço: {formatBalance(reservation.service.price)}
        </p>

        <p className='text-sm'>Data: {selectedDate.toDateString()}</p>
      </CardContent>
      <CardFooter className='flex justify-between gap-5'>
        <ReserveUpload
          saveType='Editar'
          session={session}
          reservation={reservation}
          mutate={mutate}
        />
        <Button onClick={() => handleCancelReservation(reservation.id)}>
          Cancelar
        </Button>
      </CardFooter>
    </Card>
  );
}

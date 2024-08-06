import { Session } from 'next-auth';

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
import { ServiceType } from '@/types/service';
import { createReservation } from '@/app/api/services/customer-services';

type ServiceCardType = {
  service: ServiceType;
  session: Session;
  mutate: () => void;
};

export function ServiceCard({ service, session, mutate }: ServiceCardType) {
  const handleCreateReservation = async (serviceId: string) => {
    try {
      await createReservation(serviceId, session);
      mutate();
    } catch (erro) {
      console.error('Erro no exemplo de uso:', erro);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{service.name}</CardTitle>
        <CardDescription>{service.description}</CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <p className='text-sm'>Preço: {formatBalance(service.price)}</p>
        <p className='text-sm'>Provedor: {service.provider.fullName}</p>
      </CardContent>
      <CardFooter className='flex justify-between gap-5'>
        <Button onClick={() => handleCreateReservation(service.id)}>
          Reservar
        </Button>
      </CardFooter>
    </Card>
  );
}

import { Session } from 'next-auth';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatBalance } from '@/lib/utils';
import { ServiceType } from '@/types/service';
import { ReserveUpload } from './reserve-upload';

type ServiceCardType = {
  service: ServiceType;
  session: Session;
  mutate: () => void;
};

export function ServiceCard({ service, session, mutate }: ServiceCardType) {
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
        <ReserveUpload
          saveType='Reservar'
          session={session}
          service={service}
          mutate={mutate}
        />
      </CardFooter>
    </Card>
  );
}

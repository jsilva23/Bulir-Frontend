'use client';
import { CalendarArrowUp, SaveIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ServiceType } from '@/types/service';
import { Session } from 'next-auth';
import { useFetch } from '@/hooks/useFetch';
import { useState } from 'react';
import { ReserveForm } from './reserve-form';
import { formatBalance } from '@/lib/utils';

type ServiceUploadType = {
  service: ServiceType;
  session: Session;
  mutate: () => void;
};

export function ReserveUpload({ service, session, mutate }: ServiceUploadType) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <CalendarArrowUp className='mr-2 h-4 w-4' />
          Reservar
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Reservar {service.name}</DialogTitle>
          <DialogDescription>
            Reserva o serviço {service.name} de {service.provider.fullName} no
            valor de {formatBalance(service.price)}.
          </DialogDescription>
        </DialogHeader>

        <ReserveForm
          session={session}
          service={service}
          mutate={mutate}
          close={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}

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
import { ReservationType, ServiceType } from '@/types/service';
import { Session } from 'next-auth';
import { useFetch } from '@/hooks/useFetch';
import { useState } from 'react';
import { ReserveForm } from './reserve-form';
import { formatBalance } from '@/lib/utils';

type ServiceUploadType = {
  saveType: 'Reservar' | 'Editar';
  service?: ServiceType;
  reservation?: ReservationType;
  session: Session;
  mutate: () => void;
};

export function ReserveUpload({
  saveType,
  reservation,
  service,
  session,
  mutate,
}: ServiceUploadType) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={saveType === 'Editar' ? 'outline' : 'default'}>
          {saveType === 'Reservar' && (
            <CalendarArrowUp className='mr-2 h-4 w-4' />
          )}
          {saveType === 'Editar' ? 'Atualizar data' : 'Reservar Serviço'}
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>
            {service ? service.name : reservation?.service.name}
          </DialogTitle>
        </DialogHeader>

        {saveType === 'Editar' ? (
          <ReserveForm
            session={session}
            reservation={reservation}
            mutate={mutate}
            close={setOpen}
          />
        ) : (
          <ReserveForm
            session={session}
            service={service}
            mutate={mutate}
            close={setOpen}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

'use client';
import { PlusCircleIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AddServiceForm } from './add-service-form';
import { EditServiceForm } from './edit-service-form';
import { ServiceType } from '@/types/service';
import { Session } from 'next-auth';
import { useFetch } from '@/hooks/useFetch';
import { useState } from 'react';

type ServiceUploadType = {
  saveType: 'Adicionar' | 'Editar';
  service?: ServiceType;
  session: Session;
};

export function ServiceUpload({
  saveType,
  service,
  session,
}: ServiceUploadType) {
  const [open, setOpen] = useState<boolean>(false);
  const { mutate } = useFetch<ServiceType[]>('services/provider', session);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={saveType === 'Editar' ? 'outline' : 'default'}>
          {saveType === 'Adicionar' && (
            <PlusCircleIcon className='mr-2 h-4 w-4' />
          )}
          {saveType} Serviço
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{saveType} Serviço</DialogTitle>
          <DialogDescription>
            Info do seu serviço e Click em salvar.
          </DialogDescription>
        </DialogHeader>
        {saveType === 'Editar' ? (
          <AddServiceForm
            session={session}
            service={service}
            mutate={mutate}
            close={setOpen}
          />
        ) : (
          <AddServiceForm session={session} mutate={mutate} close={setOpen} />
        )}
      </DialogContent>
    </Dialog>
  );
}

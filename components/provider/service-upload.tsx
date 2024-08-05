/* eslint-disable @next/next/no-img-element */
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

type ServiceUploadType = {
  saveType: 'Adicionar' | 'Editar';
};

export function ServiceUpload({ saveType }: ServiceUploadType) {
  return (
    <Dialog>
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
        {saveType === 'Editar' ? <EditServiceForm /> : <AddServiceForm />}
      </DialogContent>
    </Dialog>
  );
}

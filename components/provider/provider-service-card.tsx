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
import { ServiceType } from '@/types/service';
import { Session } from 'next-auth';
import { deleteService } from '@/app/api/services/provider-services';

type ServiceCardType = {
  service: ServiceType;
  session: Session;
  mutate: () => void;
};

export function ProviderServiceCard({
  service,
  session,
  mutate,
}: ServiceCardType) {
  const handleDeleteService = async (serviceId: string) => {
    try {
      await deleteService(session, serviceId);
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
      <CardContent>
        <p className='text-sm'>Preço: {formatBalance(service.price)}</p>
      </CardContent>
      <CardFooter className='flex justify-between gap-5'>
        <ServiceUpload saveType='Editar' session={session} service={service} />
        <Button onClick={() => handleDeleteService(service.id)}>
          Eliminar
        </Button>
      </CardFooter>
    </Card>
  );
}

'use client';

import { Session } from 'next-auth';

import { useFetch } from '@/hooks/useFetch';

import { Separator } from '@/components/ui/separator';
import { ServiceType } from '@/types/service';
import { ProviderServiceCard } from './provider-service-card';

export function ServicesGrid({ session }: { session: Session }) {
  const { data, mutate } = useFetch<ServiceType[]>(
    'services/provider',
    session
  );

  return (
    <div className='h-full px-4 py-6 lg:px-8'>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <h2 className='text-2xl font-semibold tracking-tight'>
            Meus Serviços
          </h2>
        </div>
      </div>
      <Separator className='my-4' />

      {data?.length === 0 ? (
        <div className='p-10'>
          <h1 className='text-3xl font-semibold text-gray-300 tracking-tight'>
            Não tens servicos cadastrados!
          </h1>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
          {data?.map((service) => (
            <ProviderServiceCard
              key={service.id}
              service={service}
              session={session}
              mutate={mutate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

'use client';

import { Session } from 'next-auth';

import { useFetch } from '@/hooks/useFetch';

import { Separator } from '@/components/ui/separator';
import { ServiceCard } from '@/components/customer/service-card';
import { ServiceType } from '@/types/service';
import Link from 'next/link';

export function AllServicesGrid({ session }: { session: Session }) {
  const { data, isLoading, mutate } = useFetch<ServiceType[]>(
    'services',
    session
  );

  return (
    <div className='h-full px-4 py-6 lg:px-8'>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <h2 className='text-2xl font-semibold tracking-tight'>
            Todos Serviços
          </h2>
        </div>
        <Link className='text-blue-800' href={'customer/reservas'}>
          Minhas reservas
        </Link>
      </div>
      <Separator className='my-4' />

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
        {data?.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            session={session}
            mutate={mutate}
          />
        ))}
      </div>
    </div>
  );
}

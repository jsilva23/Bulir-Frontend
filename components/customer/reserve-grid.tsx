'use client';

import { Session } from 'next-auth';

import { useFetch } from '@/hooks/useFetch';

import { Separator } from '@/components/ui/separator';
import { ReservationType } from '@/types/service';
import { ReserveCard } from './reserve-card';
import Link from 'next/link';

export function ReserveGrid({ session }: { session: Session }) {
  const { data, mutate } = useFetch<ReservationType[]>(
    'reservations/history',
    session
  );

  return (
    <div className='h-full px-4 py-6 lg:px-8'>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <h2 className='text-2xl font-semibold tracking-tight'>
            Minhas Reservas
          </h2>
        </div>
        <Link className='text-blue-800' href={'/customer'}>Ver serviços</Link>
      </div>
      <Separator className='my-4' />

      {data?.length === 0 ? (
        <div className='p-10'>
          <h1 className='text-3xl font-semibold text-gray-300 tracking-tight'>
            Não tens reservas de serviços!
          </h1>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
          {data?.map((reservation) => (
            <ReserveCard
              key={reservation.id}
              reservation={reservation}
              session={session}
              mutate={mutate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

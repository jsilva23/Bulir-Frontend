'use client';

import React from 'react';
import { Session } from 'next-auth';

import { useFetch } from '@/hooks/useFetch';
import { formatBalance } from '@/lib/utils';

const Balance = ({ session }: { session: Session }) => {
  const { data, mutate } = useFetch<{ balance: number }>(
    'users/balance',
    session
  );
  return (
    <h3 className='text-xl font-semibold'>
      {data ? formatBalance(data.balance) : formatBalance(0)}
    </h3>
  );
};

export default Balance;

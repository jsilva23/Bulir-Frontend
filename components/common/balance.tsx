'use client';

import React, { useState } from 'react';
import { Session } from 'next-auth';

import { useFetch } from '@/hooks/useFetch';
import { formatBalance } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CalendarArrowUp, HandCoins } from 'lucide-react';
import { DepositForm } from './deposit-form';

const Balance = ({ session }: { session: Session }) => {
  const [open, setOpen] = useState<boolean>(false);

  const { data, mutate } = useFetch<{ balance: number }>(
    'users/balance',
    session
  );
  return (
    <div className='space-y-2'>
      <h3 className='text-xl font-semibold'>
        {data ? formatBalance(data.balance) : formatBalance(0)}
      </h3>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant='secondary'>
            <HandCoins className='mr-2 h-4 w-4' />
            Depositar
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Deposita valores a sua conta</DialogTitle>
          </DialogHeader>

          <DepositForm session={session} mutate={mutate} close={setOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Balance;

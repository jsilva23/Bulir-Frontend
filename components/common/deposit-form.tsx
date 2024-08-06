'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Session } from 'next-auth';
import { deposit } from '@/app/api/services/common-services';

type ServiceFormType = {
  session: Session;
  mutate: () => void;
  close: React.Dispatch<React.SetStateAction<boolean>>;
};

const formSchema = z.object({
  balance: z.string(),
});

export function DepositForm({ session, mutate, close }: ServiceFormType) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      balance: '0',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await deposit(values, session);
      mutate();
      close(false);
    } catch (erro) {
      console.error('Erro no exemplo de uso:', erro);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='balance'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor a depositar</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Depositar</Button>
      </form>
    </Form>
  );
}

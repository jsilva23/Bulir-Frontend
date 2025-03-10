'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ReservationType, ServiceType } from '@/types/service';
import { Session } from 'next-auth';
import { createReservation, editReservation } from '@/app/api/services/customer-services';
import { useFetch } from '@/hooks/useFetch';

type ServiceFormType = {
  service?: ServiceType;
  reservation?: ReservationType;
  session: Session;
  mutate: () => void;
  close: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormSchema = z.object({
  date: z.date({
    required_error: 'A data da reserva é obrigatoria.',
  }),
});

export function ReserveForm({
  session,
  service,
  reservation,
  mutate,
  close,
}: ServiceFormType) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: reservation ? reservation.date : undefined,
    },
  });

  const { mutate: balanceMutate } = useFetch<{ balance: number }>(
    'users/balance',
    session
  );

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      if (service) await createReservation(service.id, data, session);
      if (reservation) await editReservation(reservation.id, data, session);
      mutate();
      balanceMutate();
      close(false);
    } catch (erro: any) {
      console.error('Erro no exemplo de uso:', erro.response.data.message);
      alert(erro.response.data.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='date'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Data da reserva</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Escolhe a data da reserva</span>
                      )}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Reservar</Button>
      </form>
    </Form>
  );
}

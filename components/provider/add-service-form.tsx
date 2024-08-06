'use client';
import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createService, editService } from '@/app/api/services/provider-services';
import { ServiceType } from '@/types/service';
import { Session } from 'next-auth';

type ServiceFormType = {
  service?: ServiceType;
  session: Session;
  mutate: () => void;
  close: React.Dispatch<React.SetStateAction<boolean>>;
};

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'O nome do serviço é obrigatório.',
  }),
  description: z.string(),
  price: z.string({ required_error: 'O preço do serviço é obrigatório.' }),
});

export function AddServiceForm({
  session,
  service,
  close,
  mutate,
}: ServiceFormType) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: service ? service.name : '',
      description: service ? service.description : '',
      price: service ? service.price.toString() : '0',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (service) {
        await editService(values, session, service.id);
      } else {
        await createService(values, session);
      }
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
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do serviço</FormLabel>
              <FormControl>
                <Input placeholder='Nome' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input placeholder='descrição' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='price'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço</FormLabel>
              <FormControl>
                <Input placeholder='preço' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>Adicionar</Button>
      </form>
    </Form>
  );
}

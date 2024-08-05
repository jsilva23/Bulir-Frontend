'use client';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Role } from '@/lib/utils';

const formSchema = z.object({
  fullName: z.string({
    required_error: 'O nome é obrigatório',
  }),
  email: z
    .string({
      required_error: 'O e-mail é obrigatório',
    })
    .email({
      message: 'Deve ser um e-mail válido',
    }),
  nif: z.string({
    required_error: 'O NIF é obrigatório',
  }),
  password: z
    .string({
      required_error: 'A senha é obrigatório',
    })
    .min(8, {
      message: 'A senha deve ter pelo menos 8 caracteres',
    })
    .max(12),
  role: z.enum(['Client', 'Provider']),
});

const CreateAccountForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      nif: '',
      password: '',
      role: Role.Client,
    },
  });

  return (
    <div className='w-full flex flex-col justify-center items-center space-y-2'>
      <Form {...form}>
        <form className='w-full flex flex-col space-y-4'>
          <FormField
            control={form.control}
            name='fullName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Completo</FormLabel>
                <FormControl>
                  <Input placeholder='Nome completo' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder='E-mail' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='nif'
            render={({ field }) => (
              <FormItem>
                <FormLabel>NIF</FormLabel>
                <FormControl>
                  <Input placeholder='nif' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='Senha' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='role'
            render={({ field }) => (
              <FormItem className='space-y-3'>
                <FormLabel>Tipo de conta</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className='flex flex-col space-y-1'
                  >
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value={Role.Client} />
                      </FormControl>
                      <FormLabel className='font-normal'>Cliente</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value={Role.Provider} />
                      </FormControl>
                      <FormLabel className='font-normal'>
                        Provedor de serviço
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit'>Criar conta</Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateAccountForm;

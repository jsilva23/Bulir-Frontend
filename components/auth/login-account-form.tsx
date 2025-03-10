'use client';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  identifier: z.string({
    required_error: 'O e-mail é obrigatório',
  }),
  password: z.string({
    required_error: 'A senha é obrigatório',
  }),
});

const LoginAccountForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  async function onSubmit({
    identifier,
    password,
  }: z.infer<typeof formSchema>) {
    try {
      const response = await signIn('credentials', {
        identifier,
        password,
        redirect: false,
      });

      if (response?.ok) {
        router.refresh();
      } else {
        console.error('Falha na autenticação');
      }
    } catch (error) {
      console.error('Ocorreu um erro ao processar a solicitação:', error);
    }
  }

  return (
    <div className='w-full flex flex-col justify-center items-center space-y-4'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full flex flex-col space-y-2'
        >
          <FormField
            control={form.control}
            name='identifier'
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail ou NIF</FormLabel>
                <FormControl>
                  <Input placeholder='E-mail ou NIF' {...field} />
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

          <Button type='submit'>Entrar</Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginAccountForm;

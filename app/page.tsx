import { redirect, RedirectType } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CreateAccountForm from '@/components/auth/create-account-form';
import LoginAccountForm from '@/components/auth/login-account-form';
import { authOptions } from './api/auth/auth';
import { Role } from '@/lib/utils';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    if (session.user.role === Role.Client) {
      redirect('/customer', RedirectType.replace);
    }
    if (session.user.role === Role.Provider) {
      redirect('/provider', RedirectType.replace);
    }
  }

  return (
    <div className='flex flex-col h-screen w-full justify-center items-center'>
      <Tabs defaultValue='login' className='w-[400px]'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='create-account'>Criar conta</TabsTrigger>
          <TabsTrigger value='login'>Login</TabsTrigger>
        </TabsList>
        <TabsContent value='create-account'>
          <CreateAccountForm />
        </TabsContent>
        <TabsContent value='login'>
          <LoginAccountForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}

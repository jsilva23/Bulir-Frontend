import { ReactNode } from 'react';

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from '../api/auth/auth';

interface PrivateLayoutProps {
  children: ReactNode;
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  return <>{children}</>;
}

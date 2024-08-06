import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/auth';

import AppHeader from '@/components/common/app-header';
import { ServiceUpload } from '@/components/provider/service-upload';
import Balance from '@/components/common/balance';
import { ServicesGrid } from '@/components/provider/services-grid';

async function UserApp() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  return (
    <>
      <AppHeader />
      <div className='bg-background border-t'>
        <div className='container'>
          <div>
            <div className='flex items-center p-6 justify-between'>
              <div>
                <span>Dashboard do provedor de serviços</span>
              </div>

              <ServiceUpload saveType='Adicionar' session={session} />
            </div>
            <div className='flex items-center p-6 justify-end'>
              <Balance session={session} />
            </div>

            <ServicesGrid session={session} />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserApp;

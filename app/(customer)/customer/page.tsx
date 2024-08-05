import React from 'react';

import AppHeader from '@/components/common/app-header';

import { formatBalance } from '@/lib/utils';
import { AllServicesGrid } from '@/components/customer/all-services-grid';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/auth';

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
                <span>Dashboard do Cliente</span>
              </div>

              <h3 className='text-xl font-semibold'>
                {formatBalance(4556.41)}
              </h3>
            </div>

            <AllServicesGrid session={session} />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserApp;

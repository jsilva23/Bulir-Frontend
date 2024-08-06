import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/auth';

import AppHeader from '@/components/common/app-header';
import Balance from '@/components/common/balance';
import { ReserveGrid } from '@/components/customer/reserve-grid';

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

              <Balance session={session} />
            </div>

            <ReserveGrid session={session} />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserApp;

import React from 'react';

import AppHeader from '@/components/common/app-header';
import { Separator } from '@/components/ui/separator';
import { ProviderServiceCard } from '@/components/provider/provider-service-card';
import { ServiceUpload } from '@/components/provider/service-upload';
import { formatBalance } from '@/lib/utils';

async function UserApp() {
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

              <ServiceUpload saveType='Adicionar' />
            </div>
            <div className='flex items-center p-6 justify-end'>
              <h3 className='text-xl font-semibold'>{formatBalance(4556.41)}</h3>
            </div>

            <div className='h-full px-4 py-6 lg:px-8'>
              <div className='flex items-center justify-between'>
                <div className='space-y-1'>
                  <h2 className='text-2xl font-semibold tracking-tight'>
                    Meus Serviços
                  </h2>
                </div>
              </div>
              <Separator className='my-4' />

              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
                <ProviderServiceCard />
                <ProviderServiceCard />
                <ProviderServiceCard />
                <ProviderServiceCard />
                <ProviderServiceCard />
                <ProviderServiceCard />
                <ProviderServiceCard />
                <ProviderServiceCard />
                <ProviderServiceCard />
                <ProviderServiceCard />
                <ProviderServiceCard />
                <ProviderServiceCard />
                <ProviderServiceCard />
                <ProviderServiceCard />
                <ProviderServiceCard />
                <ProviderServiceCard />
                <ProviderServiceCard />
                <ProviderServiceCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserApp;

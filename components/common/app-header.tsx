import { UserNav } from './user-nav';

import React from 'react';

const UserAppHeader = () => {
  return (
    <header>
      <nav className='flex justify-between items-center m-4 max-w-[90rem] mx-auto'>
        <span className='font-extrabold'>
          Bulir<span className='font-extralight'>Reservas</span>
        </span>
        <UserNav />
      </nav>
    </header>
  );
};

export default UserAppHeader;

'use client';
import { signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';

export function UserNav() {
  const { data: session, status } = useSession();
  const router = useRouter();

  async function logout() {
    await signOut({
      redirect: false,
    });
    router.refresh();
  }

  function getInitials(fullName: string): string {
    const nameParts = fullName.trim().split(' ');

    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];

    const firstInitial = firstName[0].toUpperCase();
    const lastInitial = lastName[0].toUpperCase();

    return `${firstInitial}${lastInitial}`;
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
            <Avatar className='h-8 w-8'>
              <AvatarImage src='/avatars/jsilva.jpg' alt='restore' />
              <AvatarFallback>
                {session ? getInitials(session?.user.fullName) : 'User'}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56' align='end' forceMount>
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col space-y-2'>
              <p className='text-sm font-medium leading-none'>
                {session?.user.fullName}
              </p>
              <p className='text-xs leading-none text-muted-foreground'>
                {session?.user?.email}
              </p>
              <p className='text-xs leading-none text-muted-foreground'>
                NIF: {session?.user?.nif}
              </p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => logout()}>
            Terminar sessão
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

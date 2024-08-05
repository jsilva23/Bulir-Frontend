import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { Role } from './lib/utils';

export async function middleware(request: NextRequest) {
  const currentUser: any = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (currentUser) {
    const role = currentUser.user.user.role;
    if (
      role === Role.Client &&
      !request.nextUrl.pathname.startsWith('/customer')
    ) {
      return NextResponse.redirect(new URL('/customer', request.url));
    }
    if (
      role === Role.Provider &&
      !request.nextUrl.pathname.startsWith('/provider')
    ) {
      return NextResponse.redirect(new URL('/provider', request.url));
    }
  }

  if (!currentUser && request.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

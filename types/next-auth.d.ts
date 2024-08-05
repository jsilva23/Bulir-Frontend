import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      fullName: string;
      email: string;
      nif: string;
      role: string;
    };
    access_token: string;
  }
}

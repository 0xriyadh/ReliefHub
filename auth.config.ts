import type { NextAuthConfig } from 'next-auth';
import { fetchUser } from './app/lib/data';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const user = fetchUser(auth?.user?.email as string);
      console.log('user', user);
      const isOnAdminDashboard = nextUrl.pathname.startsWith('/admin');
      if (isOnAdminDashboard) {
        if (isLoggedIn) {
          
          
          return true;
        }
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/admin', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;

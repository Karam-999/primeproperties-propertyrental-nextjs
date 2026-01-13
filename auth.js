// import NextAuth from 'next-auth';
// // import { authOptions } from './utils/authOptions';
// import { authOptions } from '@/utils/authOptions';
// // export const { auth, handlers } = NextAuth({
// //   callbacks: {
// //     authorized: async ({ auth }) => {
// //       // Logged in users are authenticated, otherwise redirect to login page
// //       return !!auth;
// //     },
// //   },
// // });
// export const { auth } = NextAuth(authOptions);

import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export const { auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});

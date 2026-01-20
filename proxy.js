// import { auth } from '@/auth';
// import { NextResponse } from 'next/server';

// export default auth((req) => {
//   if (!req.auth) {
//     // Not logged in, redirect to home or login page
//     return NextResponse.redirect(new URL('/properties', req.url));
//   }
//   // Logged in, allow access
//   return NextResponse.next();
// });

// export const config = {
//   matcher: ['/properties/add', '/messages', '/profile', '/profile/:path*'],
//   runtime: 'nodejs',
// };
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // User is NOT logged in
  if (!req.auth?.user) {
    //  /properties/add
    if (pathname === '/properties/add') {
      return NextResponse.redirect(new URL('/properties', req.nextUrl));
    }

    // All other protected routes
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  // Logged in → allow
});

export const config = {
  matcher: ['/properties/add', '/messages', '/profile', '/saved'],

};

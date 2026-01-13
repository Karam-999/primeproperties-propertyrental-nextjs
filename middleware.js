import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  if (!req.auth) {
    // Not logged in, redirect to home or login page
    return NextResponse.redirect(new URL('/properties', req.url));
  }
  // Logged in, allow access
  return NextResponse.next();
});

export const config = { matcher: ['/properties/add'] };

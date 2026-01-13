'use client';
import { SessionProvider } from 'next-auth/react';

const AuthProviderComponent = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProviderComponent;

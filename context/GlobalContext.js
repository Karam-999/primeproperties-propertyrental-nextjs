'use client';
import { createContext, useState, useEffect, useContext } from 'react';
import getUnreadMessageCount from '@/app/actions/getUnreadMessageCount';
import { useSession } from 'next-auth/react';

const GlobalContext = createContext();

//provider component
export function GlobalContexttProvider({ children }) {
  const [unReadMessagesCount, setUnreadMessagesCount] = useState(0);
  const { data: session } = useSession();
  useEffect(() => {
    console.log('GlobalContexttProvider useEffect');
    if (session && session.user) {
      console.log('user is logged in');
      getUnreadMessageCount()
        .then((res) => {
          console.log('getUnreadMessageCount res:', res);
          if (res.count) setUnreadMessagesCount(res.count);
        })
        .catch((err) => {
          console.log('getUnreadMessageCount error:', err);
        });
    }
  }, [getUnreadMessageCount, session]);
  console.log('GlobalContexttProvider returning');
  return (
    <GlobalContext.Provider
      value={{
        unReadMessagesCount,
        setUnreadMessagesCount,
      }}>
      {children}
    </GlobalContext.Provider>
  );
}
//custom hook to use the global context
export function useGlobalContext() {
  return useContext(GlobalContext);
}
